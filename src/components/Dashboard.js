import { useNavigate } from "react-router-dom";
import ChatBox from '../components/dashboard-components/Chatbox'
import Thread from '../components/dashboard-components/Thread'
import SideBar from '../components/dashboard-components/Sidebar'


export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/")
  }

  const createChannel = () => {
  }
  
  return (
    <>
    <section className="flex flex-row w-screen h-screen">
      <SideBar handleLogOut = {handleLogOut} createChannel={createChannel}/>
      <ChatBox/>
      <Thread/>
    </section>
    </>
  )
}

