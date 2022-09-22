import { useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

export default function Homepage() {
  const navigate = useNavigate();

  const handleLogIn = () => {
    navigate("./Dashboard")
  }

  return (
    <>
    <h1>THIS IS HOMEPAGE</h1>
    <button onClick={handleLogIn}>LOGIN</button>
    <Register />
    <Login />
    </>
  )
}