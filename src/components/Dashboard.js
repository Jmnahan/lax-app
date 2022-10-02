import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import ChatBox from '../components/dashboard-components/Chatbox'
import SideBar from '../components/dashboard-components/Sidebar'
import axios from "../api/axios";
export default function Dashboard() {
  const navigate = useNavigate();
  const [messageThread, setMessageThread] = useState([])
  const [receipient, setReceipient] = useState("")
  const [receipientID, setReceipientID] = useState(1)

  const [allUsers, setAllUsers] = useState([])

  const localHeaders = JSON.parse(localStorage.getItem("loggedUser"));
 
  const localClient = localHeaders.client;
  const localToken = localHeaders["access-token"];
  const localID = localHeaders.id;
  const localUID = localHeaders.uid;
  const localExpiry = localHeaders.expiry;

  const [ userEmail, setUserEmail ] = useState("");
  const [ id, setId] = useState(0);
  const [ ids, setIds ] = useState([]);
  const [ channelName, setChannelName ] = useState("");
  const [ channelNameError, setChannelNameError] = useState(false);
  const [ channels, setChannels ] = useState([]);
  const [ channel, setChannel ] = useState({
    user_ids: [],
    name: ""
  })
  
  const addId = () => {
    setIds([...ids, id])
  }

  useEffect(() => {
    if(id) {
      addId()
    }
  },[id])

  const addChannel = (channel) => {
    setChannels([channel, ...channels])
  }

  const handleCreateChannel = (e) => {
    e.preventDefault()
    if(channelName === "") {
      setChannelNameError(true)
    } else {
      addChannel({...channel,
        user_ids: ids,
        name: channelName
      })
    }
  }

  const handleLogOut = () => {
    localStorage.removeItem("loggedUser")
    navigate("/")
  }

  const loadUsers = async () => {
    await axios
      .get(`/api/v1/users`, {headers: {
        "access-token": localToken,
        client: localClient,
        expiry: localExpiry,
        uid: localUID
      }})
      .then ((user) => {
        const totalUserData = user.data.data.map(item=>item)
        setAllUsers(totalUserData)
      })
  }

  return (
    <>
      <section className="flex flex-row w-screen h-screen">
        <SideBar
          loadUsers={loadUsers}
          handleLogOut={handleLogOut}
          setReceipient={setReceipient}
          setReceipientID={setReceipientID}
          localClient={localClient}
          localToken={localToken}
          localID={localID}
          localUID={localUID}
          localExpiry={localExpiry}
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          id={id}
          setId={setId}
          ids={ids}
          allUsers={allUsers}
          setIds={setIds}
          channels={channels}
          channelName={channelName}
          setChannelName={setChannelName}
          handleCreateChannel={handleCreateChannel}
          channelNameError={channelNameError}
          setChannelNameError={setChannelNameError}
        />
        <ChatBox
          localClient={localClient}
          localToken={localToken}
          localID={localID}
          localUID={localUID}
          localExpiry={localExpiry}
          messageThread={messageThread}
          setMessageThread={setMessageThread}
          receipientID={receipientID}
        />
      </section>
    </>
  );
}

