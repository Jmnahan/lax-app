import { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import HomepageImg from "../assets/Croods.png";
import "../index.css";

export default function Homepage() {
  const [isSignedUp, setIsSignedUp] = useState("register")

  const onToggle = () => {
    setIsSignedUp(isSignedUp === "register" ? "login" : "register")
  }

  return (
    <>
    <section className="bg-fuchsia-900 h-screen flex items-center justify-center">
      <div className="flex rounded-lg w-2/5">
        <div className="flex relative bg-fuchsia-700 py-12 justify-center w-1/2 rounded-tl-lg rounded-bl-lg">
          {isSignedUp === "register" && (
            <h1 className="left absolute text-3xl text-white font-semibold top-8">Join our community!</h1>
          )}
          {isSignedUp === "login" && (
            <h1 className="left absolute text-3xl text-white font-semibold top-8">Welcome back!</h1>
          )}
          <img alt="people" src={HomepageImg} />
        </div>
        <div className="w-1/2 bg-white flex flex-col items-center pt-10 rounded-tr-lg rounded-br-lg">
        {isSignedUp === "register" && (
          <Register 
          setIsSignedUp={setIsSignedUp}
          onToggle={onToggle}
          />
        )}
        {isSignedUp === "login" && (
          <Login 
          onToggle={onToggle}
        />
        )}
        </div>
      </div>
    </section>
    </>
  )
}