import { useEffect, useState } from "react"
import AddMember from "./AddMember"
import axios from "../../api/axios";
import Chatmessages from "./Chatmessages";

export default function ActiveChannel(props) {
  const { 
    localClient, 
    localToken,
    localUID,
    localExpiry,
    receipientID,

    activeChannel, 
    channelData, 
    render, 
    setUserEmail, 
    handleAddMember, 
    userEmail,
    addingError,
    setAddingError,
  } = props

  const [message, setMessage] = useState("");
  const [counter, setCounter] = useState(0);
  const [messageList, setMessageList] = useState([]);

  const [ addMemberModal, setAddMemberModal ] = useState(false)

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
            setMessageList(messageData)
          } else {
            console.log("no message");
          }
        });
    };
    receiveMessage();
  }, [localClient, localExpiry, localToken, localUID, messageList, receipientID]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if(addingError) {
        setAddingError("");
      } 
    }, 3000);
    return () => clearTimeout(timer)
  },[addingError, setAddingError]);
  
  if(render) {
    return <>
      <div className="w-2/5">
        <div className="border-b shadow-sm flex flex-row items-center justify-between py-3">
          <h2 className="ml-8 text-fuchsia-900 font-bold text-2xl">{activeChannel.name}</h2>
          <div className="mr-8 border py-2 px-2 rounded-lg">
              <span className="border-r p-2 mr-2 text-fuchsia-500">
              {channelData?.channel_members.length} &#128511;
              </span> 
              <button className="text-fuchsia-900 font-semibold" 
                onClick={() => setAddMemberModal(true)}>Add
              </button>
              <AddMember
              addingError={addingError}
              userEmail={userEmail}
              handleAddMember={handleAddMember}
              setUserEmail={setUserEmail}
              activeChannel={activeChannel}
              addMemberModal={addMemberModal}
              setAddMemberModal={setAddMemberModal}
              />
          </div>
        </div>
        <Chatmessages
        messageList={messageList}
        />
        <form className="fixed bottom-0 p-6 border-t w-full bg-white shadow-sm" onSubmit={handleSubmit}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border w-10/12 rounded-md indent-1 p-1 bg-gray-200 outline-none"
            ></input>
        </form>
      </div>
      </>
  } else if (!render){
    return <div className="flex flex-col items-center self-center w-full">
      <h1>Welcome to Lax-App</h1>
      <span>Interact the sidebar to render components</span>
    </div>
  }
}