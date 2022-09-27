import { useForm } from "react-hook-form";
import { useEffect } from "react";
import axios from "../api/axios";

export default function Register(props) {
  const { onToggle, setIsSignedUp, isSubmmited, setIsSubmmited } = props
  const { 
    watch,
    register, 
    handleSubmit, 
    setError, 
    formState: { errors }} = useForm({
    defaultValues: {
      email: "",
      password: "",
      password_confirmation: ""
    }
  })  

  const handleRegister = async (data) => {
    try {
      const response = await axios.post("api/v1/auth/", data);
      console.log("response data",response.data)
      setIsSubmmited(true)
    } catch (error) {
        const errors = error.response.data.errors
        Object.keys(errors).forEach((field) => {
          const messages = errors[field];
          setError(field, {
            type: "server",
            message: messages
          })
        });
      }
  }

  useEffect(()=> {
    if (Object.keys(errors).length === 0 && isSubmmited) {
      setIsSignedUp("login")
    }
  }, [errors, setIsSignedUp, isSubmmited]);

  return (
    <>
      <form className="flex flex-col w-2/3" onSubmit={handleSubmit(handleRegister)}>
      <div className="relative flex flex-col mt-4 mb-4">
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
          <p className="text-red-400 text-sm absolute top-10">{errors.email && errors.email?.message}</p>
        </div>
        
        <div className="relative flex flex-col mb-4 mt-4">
          <input className="peer indent-1 h-10 w-full border-b-2 focus:outline-none placeholder-transparent border-fuchsia-900 text-gray-800 focus:border-fuchsia-500"
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 6,
              message: "password must be at least 6 characters"
            }
          })}
          name="password"
          type="password"
          id="password"
          placeholder="Password"/>
          <label className="absolute ml-1 left-0 -top-3.5 text-sm text-fuchsia-900 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2
          peer-focus:-top-3.5 peer-focus:text-fuchsia-500" 
          htmlFor="password">Password</label>
          <p className="text-red-400 text-sm absolute top-10">{errors.password?.message}</p>
        </div> 

        <div className="relative flex flex-col mb-12 mt-4">
          <input className="peer indent-1 h-10 w-full border-b-2 focus:outline-none placeholder-transparent border-fuchsia-900 text-gray-800 focus:border-fuchsia-500"
          {...register("password_confirmation", {
            required: "confirm password required",
            validate: (val) => {
              if (watch("password") !== val) {
                return "passwords do not match"
              }
            }
          })}
          name="password_confirmation"
          type="password"
          id="password_confirmation"
          placeholder="password_confirmation"/>
          <label className="absolute ml-1 left-0 -top-3.5 text-sm text-fuchsia-900 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2
          peer-focus:-top-3.5 peer-focus:text-fuchsia-500"
          htmlFor="password_confirmation">Confirm Password</label>
          <p className="text-red-400 text-sm absolute top-10">{errors.password_confirmation?.message}</p>
        </div>

        <button className="mb-2 p-1 bg-fuchsia-700 tracking-wide text-white font-semibold hover:bg-fuchsia-500 rounded-md" 
        type="submit" 
        >Register</button>
      </form>
      <p>Already have an account? <button className="text-fuchsia-800 hover:text-fuchsia-400" onClick={onToggle}>Login?</button></p>
    </>
  )
}
