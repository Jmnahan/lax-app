import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import HomepageImg from "../assets/Croods.png";

export default function Homepage() {
  const navigate = useNavigate();
  const [isSignedUp, setIsSignedUp] = useState("register")

  const onToggle = () => {
    setIsSignedUp(isSignedUp === "register" ? "login" : "register")
  }

  const handleLogIn = () => {
    navigate("./Dashboard")
  }

  const handleRegister = () => {
    navigate("/")
    setIsSignedUp("login")
  }

  return (
    <>
    <section className="bg-fuchsia-900 h-screen flex items-center justify-center">
      <div className="flex rounded-lg w-2/5">
        <div className="flex relative bg-fuchsia-700 py-12 justify-center w-1/2 rounded-tl-lg rounded-bl-lg">
          {isSignedUp === "register" && (
            <h1 className="absolute text-3xl text-white font-semibold top-9">Join our community!</h1>
          )}
          {isSignedUp === "login" && (
            <h1 className="absolute text-3xl text-white font-semibold top-9">Welcome back!</h1>
          )}
          <img alt="people" src={HomepageImg} />
        </div>
        <div className="w-1/2 bg-white flex flex-col items-center justify-center rounded-tr-lg rounded-br-lg">
        {isSignedUp === "register" && (
          <Register 
          onToggle={onToggle}
          handleRegister={handleRegister}
          />
        )}
        {isSignedUp === "login" && (
          <Login 
          handleLogIn={handleLogIn}
          onToggle={onToggle}
        />
        )}
        </div>
      </div>
    </section>
    </>
  )
}