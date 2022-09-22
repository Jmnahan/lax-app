import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/")
  }
  
  return (
    <>
    <h1>THIS IS DASHBOARD</h1>
    <button onClick={handleLogOut}>LOGOUT</button>
    </>
  )
}

