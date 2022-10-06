import { useState, useEffect } from "react";
import axios from "../../api/axios";
import Chatmessages from "./Chatmessages";
const ChatBox = (props) => {
  const {
    localClient, 
    localToken,
    localUID,
    localExpiry,
    receipientID,
    render,

  } = props;

  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    setMessage(message);
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
    setMessage("");
  };

  const sendMessage = async () => {
    const newMessage = {
      receiver_id: receipientID,
      receiver_class: "channel",
      body: message,
    };

    await axios
      .post(`/api/v1/messages`, newMessage, {
        headers: {
          client: localClient,
          exipry: localExpiry,
          "access-token": localToken,
          uid: localUID,
        },
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  useEffect(() => {
    const receiveMessage = async () => {
      await axios
        .get(`/api/v1/messages?receiver_id=${receipientID} &receiver_class=User`, {
          headers: {
            "access-token": localToken,
            client: localClient,
            exipry: localExpiry,
            uid: localUID,
          },
        })
        .then((response) => {
          if (response.data.length !== 0) {
            let messageData = response.data.data;
            console.log(messageData)
            setMessageList(messageData)
          } else {
            console.log("no message");
          }
        });
    };
    receiveMessage();
  }, [localClient, localExpiry, localToken, localUID, messageList]);

  return (
    <div className="w-2/5">
      <div className="py-5 border-b shadow-sm flex flex-row justify-between">
        <h2 className="ml-8">Channel Name</h2>
        <button className="mr-8">Add Members</button>
      </div>
      <Chatmessages
        messageList={messageList}
      />
      <form className="fixed bottom-0 p-6 border-t border-black bg-white shadow-sm w-2/5" onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border w-full rounded-md indent-1 p-1 bg-gray-200 outline-none"
          ></input>
        </form>
    </div>
  );
};

export default ChatBox;
