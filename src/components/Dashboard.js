import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/")
  }

  const createChannel = () => {

  }

  const SideBar = () => {
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

  const MainTextArea = () => {
  
  const toggleThread = () => {

  }


    return (
      <div className="_main-text-area w-3/5 ">
        <div className="_chat-header text-center py-5 border-b shadow-sm flex flex-row">
          <h2 className="grow">channel name</h2>
          <div className="px-3">
            <button onClick={toggleThread}>toggle</button>
          </div>
        </div>
          <span className="_message-list-container">
              <div className="_receiver mx-2">
                <div className="text-sm">
                  messenger name
                </div>
                <div className="border border-black w-fit p-2 rounded">
                  message text
                </div>
              </div>
          </span>

          <span className="fixed bottom-0 p-3 border-t border-black shadow-sm w-3/5">
            <input type="text" className="border w-[80%] rounded-full"></input>
          </span>
      </div>
    )
  }

  const Thread = () => {
    return (
      <div className="_Thread text-center  py-5 border border-black w-1/5 ">
        <div>
          <h2>Thread</h2>
        </div>
         
      </div>
    )
  }
  
  return (
    <>
    <section className="flex flex-row w-screen h-screen">
      <SideBar/>
      <MainTextArea/>
      <Thread/>
    </section>
    </>
  )
}

