import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ChatBox from '../components/dashboard-components/Chatbox'
import SideBar from '../components/dashboard-components/Sidebar'
import axios from "../api/axios";
import ActiveChannel from "./dashboard-components/ActiveChannel";

export default function Dashboard() {
  const navigate = useNavigate();
  const [messageThread, setMessageThread] = useState([])
  const [receipient, setReceipient] = useState("")
  const [receipientID, setReceipientID] = useState("")

  const [allUsers, setAllUsers] = useState([])

  const localHeaders = JSON.parse(localStorage.getItem("loggedUser"));
 
  const localClient = localHeaders.client;
  const localToken = localHeaders["access-token"];
  const localID = localHeaders.id;
  const localUID = localHeaders.uid;
  const localExpiry = localHeaders.expiry;

  const [ userEmail, setUserEmail ] = useState("");
  const [ id, setId] = useState(0);
  const [ addMemId, setAddMemId ] = useState(0);
  const [ user_ids, setUser_ids ] = useState([]);
  const [ channelName, setChannelName ] = useState("");
  const [ channelNameError, setChannelNameError] = useState(false);
  const [ channels, setChannels ] = useState([]);
  const [ activeChannel, setActiveChannel ] = useState({});
  const [ channelData, setChannelData] = useState({});
  const [ render, setRender ] = useState(false);
  const [ res, setRes ] = useState(0);
  const [ addingError, setAddingError ] = useState("");
  const [ chanCreateError, setChanCreateError ] = useState("");
  const [ isSubmitted, setIsSubmitted] = useState(false);

  const [ channel, setChannel ] = useState({
    name: "",
    user_ids: []
  })
  const [ addedMember, setAddedMember ] = useState({
    id: 0,
    member_id: 0
  })

  const addId = () => {
    setUser_ids([...user_ids, id])
  }

  const handleAddMember = (e) => {
    e.preventDefault()
    setUserEmail("")
    setAddMemId(0)
    OnAddingMember()
  }

  const handleCreateChannel = (e) => {
    e.preventDefault()
    if(channelName === "") {
      setChannelNameError(true)
    } else {
      setChannel({
        name: channelName,
        user_ids: user_ids
      })
      setIsSubmitted(true)
    }
  }

  const handleLogOut = () => {
    localStorage.removeItem("loggedUser")
    navigate("/")
  }

  const onChannelClick = (e) => {
    const clickedChannel = e.target.textContent
    channels.forEach(channel => {
      if(clickedChannel === channel.name) {
        setActiveChannel(channel)
        setRender(true)
      }
    })
  }

  const loadChannelDetails = async () => {
    await axios
      .get(`/api/v1/channels/${activeChannel.id}`, {headers: {
        "access-token": localToken,
        client: localClient,
        expiry: localExpiry,
        uid: localUID
      }})
      .then ((response) => {
        const data = response.data.data
        setChannelData(data)
      })
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

  const loadChannels = async () => {
    await axios
      .get(`/api/v1/channels`, {headers: {
        "access-token": localToken,
        client: localClient,
        expiry: localExpiry,
        uid: localUID
      }})
      .then ((channels) => {
        const channelArr = channels.data.data
        setChannels(channelArr)
      })
  }
  
  const OnCreateChannel = async () => {
    await axios
      .post(`api/v1/channels`, channel, {headers: 
        { "access-token": localToken,
          client: localClient,
          expiry: localExpiry,
          uid: localUID
        }
      })
      .then ((response) => {
        let errors = response.data.errors
        setChanCreateError(errors)
      })
  }

  const OnAddingMember = async () => {
    await axios
      .post(`api/v1/channel/add_member`, addedMember, {headers: 
        { "access-token": localToken,
          client: localClient,
          expiry: localExpiry,
          uid: localUID
        }
      })
      .then ((response) => {
        let errors = response.data.errors
        setAddingError(errors)
        let serverResStatus = response.status
        setRes(serverResStatus)
      })
  }

  useEffect(() => {
    if((!channels || channels) && isSubmitted) {
      loadChannels()
    }
    
    if(res === 200) {
      loadChannelDetails()
    }
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      if(isSubmitted) {
        setIsSubmitted(false);
      } 
    }, 1000);
    return () => clearTimeout(timer)
  },[isSubmitted]);

  useEffect(() => {
    if(localToken) {
      loadChannels()
      loadChannelDetails()
    } 
  },[])

  useEffect(() => {
    if(id) {
      addId()
    }
  },[id])

  useEffect(() => {
    if(activeChannel) {
      loadChannelDetails()
    }
  },[activeChannel])

  useEffect(() => {
    if (channel.name !== "") {
      OnCreateChannel()
    }
  }, [channel])

  useEffect(() => {
    allUsers.forEach(users => {
      if (users.email === userEmail) {
        setAddMemId(users.id)
        setUserEmail(users.email)
      }
    });

    if(addMemId) {
      setAddedMember({
        id: activeChannel.id,
        member_id: addMemId
      })
    }
  },[addMemId, activeChannel.id, allUsers, userEmail])

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
          chanCreateError={chanCreateError}
          setChanCreateError={setChanCreateError}
          channels={channels}
          channelName={channelName}
          onChannelClick={onChannelClick}
          setChannelName={setChannelName}
          handleCreateChannel={handleCreateChannel}
          channelNameError={channelNameError}
          setChannelNameError={setChannelNameError}
          allUsers = {allUsers}
          setAllUsers = {setAllUsers}
          messageThread = {messageThread}
          setMessageThread = {setMessageThread}
          receipientID={receipientID}
        />
        {/* <ChatBox
          localClient={localClient}
          localToken={localToken}
          localID={localID}
          localUID={localUID}
          localExpiry={localExpiry}
          messageThread={messageThread}
          render = {render}
          setMessageThread={setMessageThread}
          receipientID={receipientID}
          receipient={receipient}
        /> */}
        <ActiveChannel
        localClient={localClient}
        localToken={localToken}
        localID={localID}
        localUID={localUID}
        localExpiry={localExpiry}
        messageThread={messageThread}
        setMessageThread={setMessageThread}
        receipientID={receipientID}

        addingError={addingError}
        setAddingError={setAddingError}
        userEmail={userEmail}
        handleAddMember={handleAddMember}
        render={render}
        setUserEmail={setUserEmail}
        activeChannel={activeChannel}
        channelData={channelData}
        />
      </section>
    </>
  );
}

