
export default function AddMember(props) {
  const { 
    addMemberModal,
    setAddMemberModal,
    activeChannel,
    setUserEmail,
    handleAddMember,
    userEmail,
    addingError,
  } = props

  if(!addMemberModal) return null


  return(
    <div className="bg-backdrop justify-center items-center flex fixed inset-0 z-10" 
    onClick={() => setAddMemberModal(false)}>
      <div className="flex flex-col relative bg-white text-zinc-800 w-1/4 p-8 rounded-2xl h-1/3" 
        onClick={(e) => {e.stopPropagation()}}>
        <h1 className="self-start text-3xl font-bold">Add people</h1>
        <span className="text-fuchsia-600"># {activeChannel.name}</span>
        <form className="mt-5 flex flex-col" onSubmit={handleAddMember}>
            <label className=" mb-2 font-medium"
              htmlFor="email">Enter user's email
            </label>
            <input className="h-8 w-2/4 indent-1 border-b-2 outline-none border-fuchsia-700"
            name="email"
            type="email"
            id="email"
            placeholder="# e.g meline@hotmail.com"
            value={userEmail}
            onChange={(event) => setUserEmail(event.target.value)}
            />
            {addingError &&
              <p className="text-red-400 text-sm mt-1 absolute top-44">User does not exist or already added</p> 
            }   
            <button className="w-1/3 self-center rounded-md p-2 mt-12 
              font-medium bg-fuchsia-700 hover:bg-fuchsia-500 text-white" 
              type="submit">Add Member
            </button>
        </form>
      </div>
    </div>
  )
}