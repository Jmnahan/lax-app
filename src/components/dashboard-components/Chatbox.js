import { useState, useEffect } from "react";
import axios from "../../api/axios";
import Chatmessages from "./Chatmessages";
const ChatBox = (props) => {
  const {
    localClient,
    localToken,
    localUID,
    localExpiry,
    messageThread,
    setMessageThread,
  } = props;
  const [message, setMessage] = useState("");
  const [render, setRender] = useState();
  const [counter, setCounter] = useState(0);
  const [messageList, setMessageList] = useState([]);

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
      receiver_id: 1,
      receiver_class: "User",
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
        setCounter((counter) => counter + 1);
      });
  };

  useEffect(() => {
    const receiveMessage = async () => {
      await axios
        .get(`/api/v1/messages?receiver_id=1&receiver_class=User`, {
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
            setMessageList(messageData)
          } else {
            console.log("no message");
          }
        });
    };
    receiveMessage();
  }, [localClient, localExpiry, localToken, localUID, messageList]);

  const toggleThread = () => {};

  return (
    <div className="_main-text-area w-3/5 ">
      <div className="_chat-header text-center py-5 border-b shadow-sm flex flex-row">
        <h2 className="grow"> Channel</h2>
        <div className="px-3">
          <button onClick={toggleThread}>toggle</button>
        </div>
      </div>
        <Chatmessages
          messageList={messageList}
        />
      <span className="fixed bottom-0 p-3 border-t border-black shadow-sm w-3/5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border w-[80%] rounded-full"
          ></input>
        </form>
      </span>
    </div>
  );
};

export default ChatBox;
