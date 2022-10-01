import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ChatBox from '../components/dashboard-components/Chatbox'
import SideBar from '../components/dashboard-components/Sidebar'
import axios from "../api/axios";
export default function Dashboard() {
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

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("loggedUser")
    navigate("/")
  }

  useEffect (()=>{
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
    loadUsers()
  },[])

  return (
    <>
      <section className="flex flex-row w-screen h-screen">
        <SideBar
          handleLogOut={handleLogOut}
          setReceipient={setReceipient}
          setReceipientID={setReceipientID}
          localClient={localClient}
          localToken={localToken}
          localID={localID}
          localUID={localUID}
          localExpiry={localExpiry}
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

