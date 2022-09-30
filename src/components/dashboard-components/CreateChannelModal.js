export default function CreateChannelModal(props) {
  const { 
    id, 
    setId, 
    ids,
    clickModal, 
    setClickModal, 
    setChannelName, 
    onCreateChannel, 
    handleAddIds } = props

  if(!clickModal) return null
  const seperatedIds = ids.join(", ")

  return(
    <div className="bg-backdrop justify-center items-center flex fixed inset-0 z-10" 
    onClick={() => setClickModal(false)}>
      <div className="flex flex-col relative bg-white text-zinc-800 w-1/4 p-8 rounded-2xl h-2/5" 
        onClick={(e) => {e.stopPropagation()}}>
        <h1 className="self-start text-3xl font-bold">Create a channel</h1>
        <form className="flex flex-col mt-8" onSubmit={onCreateChannel}>

          <label className="mb-2 font-medium" 
          htmlFor="name">Channel name</label>
          <input className="h-8 w-2/3 indent-1 border-b-2 outline-none border-fuchsia-700"
          name="name"
          type="text"
          id="name"
          placeholder="# e.g plan-budget"
          onChange={(event) => setChannelName(event.target.value)}/>
      
          <button className="w-1/2 absolute bottom-8 self-center rounded-md p-2  font-medium bg-fuchsia-700 hover:bg-fuchsia-500 text-white" type="submit">Create new channel</button>
        </form>

        <form className="mt-8" onSubmit={handleAddIds}>

          <label className=" mb-2 font-medium"
          htmlFor="id_number">Enter member's user id's</label>
          <div className="flex">
            <input className="h-8 w-1/3 indent-1 border-b-2 outline-none border-fuchsia-700"
            name="id_number"
            type="number"
            min={1}
            id="id_number"
            placeholder="# e.g 123"
            value={id}
            onChange={(event) => setId(event.target.value)}/>

            <button className="text-fuchsia-800 hover:text-fuchsia-400 text-2xl font-semibold px-1 ml-1">+</button>
          </div>

          <p className="mt-1"> user Id(s):
            <span className="text-fuchsia-600"> {seperatedIds}</span> 
          </p>
        </form>
       
      </div>
    </div>
  )
}