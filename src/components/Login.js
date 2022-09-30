import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Login(props) {
  const { onToggle } = props
  const navigate = useNavigate();
  const [ proceedLogin, setProceedLogin] = useState(false);
  JSON.parse(localStorage.getItem("loggedUser") || "{}");
  const headerValue = {}

  const { 
    register,  
    handleSubmit, 
    setError, 
    formState: { errors }} = useForm({
      defaultValues: {
      email: "",
      password: ""
  }});

  const handleLogIn = async (data) => {
    try {
      const response = await axios.post("api/v1/auth/sign_in", data);
      const id =  response.data.data.id
      const header = response.headers
      const addHeader = {...headerValue, ...header, id }
      setToLocal(addHeader)
      setProceedLogin(true)
    } catch (error) {
        const errors = error.response.data.errors
        setError("password", {
          type: "server",
          message: errors
        })
      }
  }

  const setToLocal = (addHeader) => {
    localStorage.setItem("loggedUser",JSON.stringify(addHeader));
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && proceedLogin) {
      navigate("./Dashboard")
    }
  }, [errors, proceedLogin, navigate]);

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
          name="email"
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
          name="password"
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
