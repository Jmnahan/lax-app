import { useEffect, useState } from 'react'
import CreateChannelModal from "./CreateChannelModal"
import Channel from './Channel'
import axios from "../../api/axios"
import DmList from "./DmList";
import DMModal from "./DMModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPenToSquare, faRightFromBracket, faPlus, faL } from '@fortawesome/free-solid-svg-icons'

const SideBar = (props) => {
  const {
    handleLogOut,
    setReceipientID,
    localClient,
    localToken,
    localUID,
    localExpiry,
    receipientID,
    userEmail,
    channels,
    allUsers,
    loadUsers,
    setUserEmail,
    setChannelName,
    setId,
    onChannelClick,
    channelNameError,
    setChannelNameError,
    handleCreateChannel,
    chanCreateError,
    setChanCreateError,
    setSelectedPage,
    userList,
    setUserList,
    setReceipient
  } = props

  const [modalDM, setModalDM] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [message, setMessage] = useState("");
  
  const [switchID, setSwitchID] = useState()
  const [newReceiver, setNewReceiver] = useState('')
  const [messageObject, setMessageObject] = useState({ id: "", user: "" });
  const [submitMessage, setSubmitMessage] = useState(false);
  const [clickModal, setClickModal] = useState(false);
  const [emails, setEmails] = useState([]);
  const localMessages = JSON.parse(localStorage.getItem('messages') || "[]")
  const handleAddIds = (e) => {
    e.preventDefault();
    allUsers.forEach((users) => {
      if (users.email === userEmail) {
        setId(users.id);
        setUserEmail(users.email);
        setEmails([...emails, userEmail]);
        setUserEmail("");
      }
    });
  };
  useEffect(() => {
    if (localToken) {
      loadUsers();
    }
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (channelNameError) {
        setChannelNameError(false);
      } else if (!clickModal) {
        setEmails([]);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [channelNameError, setChannelNameError, clickModal]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (chanCreateError) {
        setChanCreateError("");
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [chanCreateError, setChanCreateError]);
  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    setSearchUser(searchUser);
    setMessage(message);
  }, [searchUser, message, userList]);

  useEffect(() => {
    if (messageObject.user !== "" && submitMessage) {
      
      if (!userList?.includes(messageObject)) {
        setUserList([...userList, messageObject]);
      }
      setSubmitMessage(false);
    }

  }, [submitMessage, messageObject, userList]);

  const sendMessage = async () => {
    const newMessage = {
      receiver_id: newReceiver,
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
        setModalDM(false);
      });
  };



  const onSearch = (searchUser) => {
    setSearchUser(searchUser?.email)
    setNewReceiver(searchUser?.id)
  };
 

  return (
      <div className="w-1/5 bg-fuchsia-700 text-white border-r border-gray-400 flex-wrap">
        <div className="bg-fuchsia-900 w-full py-5 border-b border-gray-400">
          <div className="flex border-b border-gray-400">
            <h1 className="text-3xl  w-full pl-4 pb-2 pt-1 font-bold text-cyan-300">Group 2</h1>
            <button className="mr-8 px-2 mt-2 mb-2 rounded-full bg-fuchsia-600" onClick={()=> {setModalDM(true)}}>
              <span className="text-gray-400">
                <FontAwesomeIcon icon={faPenToSquare}/>
              </span>
            </button>
            {modalDM ? <DMModal 
            setNewReceiver = {setNewReceiver}
            searchUser = {searchUser}
            allUsers = {allUsers}
            setMessage = {setMessage}
            sendMessage = {sendMessage}
            setSubmitMessage = {setSubmitMessage}
            message = {message}
            setModalDM = {setModalDM}
            setMessageObject = {setMessageObject}
            onSearch = {onSearch}
            setSearchUser = {setSearchUser}
            messageObject = {messageObject}
            /> : null}
          </div>
          <h3 className="text-lg ml-4 mt-3 font-medium text-cyan-400">
            <span className="text-gray-400 mr-1">
              <FontAwesomeIcon icon={faUser}/> 
            </span>
            {localUID}
          </h3>
          <button className="ml-4 pt-1" onClick={handleLogOut}>
            <span className="mr-1 text-gray-400">
            <FontAwesomeIcon icon={faRightFromBracket} /> 
            </span>
            Log out
          </button>
        </div>
        <div className="py-5">
          <div className="flex justify-between pb-1 pl-4">
            <h3 className="text-lg font-medium text-cyan-300">Channels</h3>
            <button className="mr-8 px-2 h-8 rounded-full bg-fuchsia-600" onClick={() => setClickModal(true)}>
              <span className="text-gray-400 text-lg">
                <FontAwesomeIcon icon={faPlus} />
              </span>
            </button>
          </div>
          <CreateChannelModal
            clickModal={clickModal}
            setClickModal={setClickModal}
            handleAddIds={handleAddIds}
            setChannelName={setChannelName}
            emails={emails}
            userEmail={userEmail}
            setUserEmail={setUserEmail}
            channelNameError={channelNameError}
            handleCreateChannel={handleCreateChannel}
            chanCreateError={chanCreateError}
          />
          <div className="flex flex-col pr-1 py-2 border-b pl-4 border-gray-400">
            <Channel
            channels={channels}
            onChannelClick={onChannelClick}
            />
          </div>
          </div>
          <h3 className="pl-4 text-lg font-medium text-cyan-300">Direct Messages</h3>
          <div>
            <ul className="flex flex-col">
              <DmList
                allUsers={allUsers}
                receipientID={receipientID}
                localClient={localClient}
                localExpiry={localExpiry}
                localToken={localToken}
                localUID={localUID}
                userList={userList}
                setUserList={setUserList}
                setSelectedPage = {setSelectedPage}
                setReceipient = {setReceipient}
                setReceipientID = {setReceipientID}
              />
            </ul>
          </div>
      </div>
    )
  }

export default SideBar;
