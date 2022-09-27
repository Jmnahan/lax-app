const SideBar = (props) => {
    const { handleLogOut, createChannel } = props
  
  
    return (
      <div className="_sidebar  w-1/5 bg-fuchsia-700 text-white">
        
        <div className="ml-2">
          <button onClick={handleLogOut}>LOGOUT</button>
        <div className="grid grid-cols-2 py-5">
  
          <h1 className="">Server Name</h1>
          <div>
            <button className="">
             send new message
            </button>
          </div>
        </div>
          <div className="grid grid-cols-2 py-5">
            Channels
            <button oncClick={createChannel}>
              +
            </button>
  
            <ul className="flex flex-col">
              <span>Channel 1</span>
              <span>Channel 2</span>
            </ul>
          </div>
          Direct Messages
  
          <div>
            <ul className="flex flex-col">
              <span>person1</span>
              <span>person2</span>
              <span>person3</span>
              <span>person4</span>
            </ul>
          </div>
        </div> 
      </div>
  
    )
  }


  export default SideBar