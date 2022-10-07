
export default function CreateChannelModal(props) {
  const { 
    emails,
    userEmail,
    setUserEmail, 
    clickModal, 
    setClickModal, 
    setChannelName, 
    handleCreateChannel, 
    channelNameError,
    chanCreateError,
    handleAddIds } = props

  if(!clickModal) return null
  const emailList = emails.join(", ")

  return(
    <div className="bg-backdrop justify-center items-center flex fixed inset-0 z-10" 
    onClick={() => setClickModal(false)}>
      <div className="flex flex-col relative bg-white text-zinc-800 w-1/5 p-8 rounded-xl h-2/5" 
        onClick={(e) => {e.stopPropagation()}}>
        <h1 className="self-start text-3xl font-bold">Create a channel</h1>
        <form className="flex flex-col mt-6" onSubmit={handleCreateChannel}>
          <label className="mb-2 font-medium" 
            htmlFor="name">Channel name
          </label>
          <input className="h-8 w-3/4 indent-1 border-b-2 outline-none border-fuchsia-700"
          name="name"
          type="text"
          id="name"
          placeholder="# e.g plan-budget"
          onChange={(event) => setChannelName(event.target.value)}
          />
      
          <button className="w-1/2 absolute bottom-8 self-center rounded-md p-2 font-medium bg-fuchsia-700 hover:bg-fuchsia-500 text-white" type="submit">Create new channel</button>
          {channelNameError && <p className="text-red-400 text-sm absolute top-40">Must not be empty</p>}
          <p className="text-red-400 text-sm absolute top-40">{chanCreateError}</p>
        </form>
        
        <form className="mt-8" onSubmit={handleAddIds}>
          <label className=" mb-2 font-medium"
            htmlFor="email">Enter user's email
          </label>
          <div className="flex relative">
            <input className="h-8 w-3/4 indent-1 border-b-2 outline-none border-fuchsia-700"
            name="email"
            type="email"
            id="email"
            placeholder="# e.g meline@hotmail.com"
            value={userEmail}
            onChange={(event) => setUserEmail(event.target.value)}
            />

            <button className="text-fuchsia-800 hover:text-fuchsia-400 text-2xl font-semibold px-1 ml-1">+</button>
          </div>
          <p className="mt-1"> users:
            <span className="text-fuchsia-600"> {emailList}</span> 
          </p>
        </form>
       
      </div>
    </div>
  )
}