import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();

  const handleLogIn = () => {
    navigate("./Dashboard")
  }

  return (
    <>
    <h1>THIS IS HOMEPAGE</h1>
    <button onClick={handleLogIn}>LOGIN</button>
    </>
  )
}