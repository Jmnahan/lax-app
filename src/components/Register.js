import { useForm } from "react-hook-form";

export default function Register(props) {
  const { onToggle, handleRegister } = props
  const { register, handleSubmit } = useForm()

  const handleFormSubmit = () => {
    console.log("asdasfaslkdjas")
  }

  return (
    <>
      <form className="flex flex-col w-2/3" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="relative flex flex-col mt-4 mb-6">
          <input className="h-10 rounded-sm indent-1 peer placeholder-transparent border-b-2 focus:outline-none focus:border-fuchsia-500 bg-transparent border-fuchsia-900"
          {...register("email", {required: true})}
          type="text"
          id="email"
          placeholder="Email address"/>
          <label className="ml-1 absolute transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-700 peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-slate-700 peer-focus:text-sm" htmlFor="email">Email address</label>
        </div>
        
        <div className="relative flex flex-col mb-6">
          <input className="h-10 rounded-sm indent-1 peer placeholder-transparent border-b-2 focus:outline-none focus:border-fuchsia-500 bg-transparent border-fuchsia-900"
          {...register("password")}
          type="password"
          id="password"
          placeholder="Password"/>
          <label className=" ml-1 absolute transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-700 peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-slate-700 peer-focus:text-sm" htmlFor="password">Password</label>
        </div>

        <div className="relative flex flex-col mb-14">
          <input className="h-10 rounded-sm indent-1 peer placeholder-transparent border-b-2 focus:outline-none focus:border-fuchsia-500 bg-transparent border-fuchsia-900"
          {...register("confirmPassword")}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="confirmPassword"/>
          <label className=" ml-1 absolute transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-700 peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-slate-700 peer-focus:text-sm" htmlFor="confirmPassword">Confirm Password</label>
        </div>

        <button className="mb-2 p-1 bg-fuchsia-700 hover:bg-fuchsia-500 rounded-md" 
        type="submit" 
        onClick={handleRegister}>Register</button>
      </form>
      <p>Already have an account? <button className="text-fuchsia-800" onClick={onToggle}>Login?</button></p>
    </>
  )
}
