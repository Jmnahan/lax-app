import { useState, useEffect, useRef } from "react";
import axios from "../../api/axios";
import Chatmessages from "./Chatmessages";
const ChatBox = (props) => {
  const {
    localClient, 
    localToken,
    localUID,
    localExpiry,
    receipientID,
    receipient,
  } = props;
  const messageRef = useRef()
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const [noMessage, setNoMessages] = useState(false)
  useEffect(() => {
    setMessage(message);
  }, [message]);
  console.log(messageList)
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
    setMessage("");
  };
  const sendMessage = async () => {
    const newMessage = {
      receiver_id: receipientID,
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
      });
  };

  useEffect(() => {
    const interval = setInterval(()=> {
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
            if (response.data.data.length !== 0) {
              let messageData = response.data.data;
              setMessageList(messageData)
            } else {
              setNoMessages(true)
              setMessageList([])
            }
          });
      };
      receiveMessage();
    },600)
    return() => clearInterval(interval)
  }, [localClient, localExpiry, localToken, localUID, messageList, receipientID]);

  useEffect(()=> {
    if(messageRef.current) {
      messageRef.current.scrollIntoView(
        {
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest'
        }
      )
    }
  })
  
  return ( 
    <div className="w-4/5 h-full">
      <div className="mt-1 py-5 border-b border-gray-700 flex flex-row items-center justify-between">
        <h2 className="ml-8 text-fuchsia-900 font-bold text-2xl">{receipient}</h2>
      </div>
      <div className="overflow-auto h-84 mr-1" id="custom-style">
          {messageList.length !==0 ?<Chatmessages
          messageList={messageList}
          /> : noMessage ? <div>send a message...</div> : <div>Loading...</div>}
        </div>
      <form className="fixed mb-0.5 bottom-0 p-6 border-t border-gray-700 bg-white w-4/5" onSubmit={handleSubmit}>
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
