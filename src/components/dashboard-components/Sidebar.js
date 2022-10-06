import { useEffect, useState } from "react";
import CreateChannelModal from "./CreateChannelModal";
import Channel from "./Channel";
import axios from "../../api/axios";
import DmList from "./DmList";
import DMModal from "./DMModal";
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
  } = props;

  const [modalDM, setModalDM] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [message, setMessage] = useState("");
  const [userList, setUserList] = useState([]);
  const [messageObject, setMessageObject] = useState({ id: "", user: "" });
  const [submitMessage, setSubmitMessage] = useState(false);
  const [userDataList, setUserDataList] = useState([])
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
    console.log(userDataList)
    console.log(userList)
  }, [submitMessage, messageObject, userList]);
  

      const localUser = {id:localUID, array: userList}
      const localMessage = localStorage.setItem("messages",JSON.stringify(localUser))
   


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
        console.log(response);
        // const email = response.data.data.id
        // const data = response.data.data.body
        // console.log(email, data)
        // console.log(messageObject)
        setModalDM(false);
      });
  };
  const onSearch = (searchUser) => {
    setSearchUser(searchUser);
  };

  return (
    <div className="_sidebar  w-1/5 bg-fuchsia-700 text-white">
      <div className="ml-2">
        <button onClick={handleLogOut}>LOGOUT</button>
        <div className="grid grid-cols-2 py-5">
          <h1 className="">{localUID}</h1>
          <div>
            <button className="" onClick={() => setModalDM(true)}>
              send new message
            </button>
            {modalDM ? <DMModal 
            searchUser = {searchUser}
            allUsers = {allUsers}
            setMessage = {setMessage}
            sendMessage = {sendMessage}
            setSubmitMessage = {setSubmitMessage}
            message = {message}
            setModalDM = {setModalDM}
            setMessageObject = {setMessageObject}
            onSearch = {onSearch }
            setSearchUser = {setSearchUser}
            /> : null}
          </div>
        </div>
        <div className="grid grid-cols-2 py-5">
          Channels
          <button onClick={() => setClickModal(true)}>+</button>
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
          <div className="flex flex-col max-h-96 overflow-x-hidden col-span-2">
            <Channel channels={channels} onChannelClick={onChannelClick} />
          </div>
        </div>
        Direct Messages
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
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
