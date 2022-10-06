import { useEffect, useState, useRef } from "react"
import AddMember from "./AddMember"
import axios from "../../api/axios";
import Chatmessages from "./Chatmessages";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'

export default function ActiveChannel(props) {
  const { 
    localClient, 
    localToken,
    localUID,
    localExpiry,

    activeChannel, 
    channelData, 
    render, 
    setUserEmail, 
    handleAddMember, 
    userEmail,
    addingError,
    setAddingError,
  } = props

  const messageRef = useRef();
  const [message, setMessage] = useState("");
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
      receiver_id: activeChannel.id,
      receiver_class: "Channel",
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
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const receiveMessage = async () => {
        await axios
          .get(`/api/v1/messages?receiver_id=${activeChannel.id} &receiver_class=Channel`, {
            headers: {
              "access-token": localToken,
              client: localClient,
              exipry: localExpiry,
              uid: localUID,
            },
          })
          .then((response) => {
            const messageData = response.data.data;
            setMessageList(messageData)
          });
      };
      receiveMessage();
    }, 600);
    return () => clearInterval(interval)
  }, [localClient, localExpiry, localToken, localUID, messageList, activeChannel.id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if(addingError) {
        setAddingError("");
      } 
    }, 3000);
    return () => clearTimeout(timer)
  },[addingError, setAddingError]);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView(
        {
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest'
        })
    }
  })

  if(render) {
    return <>
      <div className="w-4/5 h-full">
        <div className="mt-0.5 py-3 border-b border-gray-700 flex flex-row items-center justify-between">
          <h2 className="ml-8 text-fuchsia-900 font-bold text-2xl"># {activeChannel.name}</h2>
          <div className="mr-8 border py-2 px-2 rounded-lg">
            <span className="border-r p-2 mr-2 text-fuchsia-500">
              {channelData?.channel_members.length} 
                <span className="ml-2">
                  <FontAwesomeIcon icon={faUsers} />
                </span>
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
        <div className="overflow-auto h-84 mr-1" id="custom-style">
          <Chatmessages
          messageList={messageList}
          />
        <div ref={messageRef}></div>
        </div>
        <form className="p-6 mb-0.5 fixed bottom-0 w-4/5 border-t border-gray-700 bg-white" onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border rounded-md indent-1 p-1 bg-gray-200 outline-none w-full"
          ></input>
        </form>
      </div>
      </>
  } else if (!render){
    return <div className="flex flex-col items-center self-center w-4/5 text-lg font-semibold text-gray-700">
      <h2>Welcome to Lax-App</h2>
      <span>Interact the sidebar to render components</span>
    </div>
  }
}