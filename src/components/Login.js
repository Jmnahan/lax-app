import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Login(props) {
  const { onToggle } = props
  const navigate = useNavigate();
  const [ proceedLogin, setProceedLogin] = useState(false);
  const [id, setId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [tokenType, setTokenType] = useState("");
  const [client, setClient] = useState("");
  const [expiry, setExpiry] = useState("");
  const [uid, setUid] = useState("");

  const headerValue = { 
    id: id,
    uid: uid,
    expiry: expiry,
    client: client,
    tokenType: tokenType,
    accessToken: accessToken,
  }

  const { 
    register,  
    handleSubmit, 
    setError, 
    formState: { errors }} = useForm({
      defaultValues: {
      email: "",
      password: ""
    }})

  const handleLogIn = async (data) => {
    try {
      const response = await axios.post("api/v1/auth/sign_in", data);
      setId(response.data.data.id)
      setAccessToken(response.headers["access-token"])
      setTokenType(response.headers["token-type"])
      setClient(response.headers.client)
      setExpiry(response.headers.expiry)
      setUid(response.headers.uid)
      setProceedLogin(true)
    } catch (error) {
        const errors = error.response.data.errors
        setError("password", {
          type: "server",
          message: errors
        })
      }
  }

  let localHeaders = JSON.parse(localStorage.getItem("localUsers") || "[]");
  useEffect(() => {
    if (Object.keys(errors).length === 0 && proceedLogin) {
      navigate("./Dashboard")
    }
  }, [errors, proceedLogin, navigate]);

  useEffect(() => {
    if(proceedLogin) {
      localHeaders.push(headerValue)
      localStorage.setItem("localUsers",JSON.stringify(localHeaders));
    }
  })

  return (
    <>
      <form className="flex flex-col w-2/3 mt-8" onSubmit={handleSubmit(handleLogIn)}>
        <div className="relative flex flex-col mb-4">
          <input className="peer indent-1 h-10 w-full border-b-2 focus:outline-none placeholder-transparent border-fuchsia-900 text-gray-800 focus:border-fuchsia-500"
          {...register("email", {
            required: "email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
              message: "please enter a valid email"
            },
          })}
          type="text"
          id="email"
          placeholder="Email address"/>
          <label className="absolute ml-1 left-0 -top-3.5 text-sm text-fuchsia-900 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2
          peer-focus:-top-3.5 peer-focus:text-fuchsia-500" 
          htmlFor="email">Email address</label>
          <p className="text-red-400 text-sm absolute top-10">{errors.email?.message}</p>
        </div>
        
        <div className="relative flex flex-col mb-12 mt-4">
          <input className="peer indent-1 h-10 w-full border-b-2 focus:outline-none placeholder-transparent border-fuchsia-900 text-gray-800 focus:border-fuchsia-500"
          {...register("password", {
            required: "password is required",
          })}
          type="password"
          id="password"
          placeholder="Password"/>
          <label className="absolute ml-1 left-0 -top-3.5 text-sm text-fuchsia-900 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2
          peer-focus:-top-3.5 peer-focus:text-fuchsia-500" 
          htmlFor="password">Password</label>
          <p className="text-red-400 text-sm absolute top-10">{errors.password && errors.password?.message}</p>
        </div>

        <button className="mb-2 p-1 bg-fuchsia-700 tracking-wide font-semibold hover:bg-fuchsia-500 rounded-md text-white"
        type="submit" 
        >Log-in</button>
      </form>
      <p>Create a new account? <button className="text-fuchsia-800 hover:text-fuchsia-400" onClick={onToggle}>Register?</button></p>
    </>
  )
}
