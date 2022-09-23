import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/")
  }

  const createChannel = () => {

  }
  
  return (
    <>
    <section className="flex flex-row w-screen h-screen">
      <div className="_sidebar border border-black w-1/5 ">
        <button onClick={handleLogOut}>LOGOUT</button>
        <div>
          <h1>Server Name</h1>
          <div>
            <button>
             send new message
            </button>
          </div>
        </div>
        <div>
          Channels
          <button oncClick={createChannel}>
            +
          </button>
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
        <div>
          
        </div>
      </div>
      <div className="_main-text-area border border-black w-3/5 ">
        <div className="text-center py-5">
          <h2>channel name</h2>
        </div>
          <span className="_message-list-container">
              <div>
                <div className="text-sm">
                  messenger name
                </div>
                <div>
                  message text
                </div>
              </div>
          </span>
      </div>

      <div className="_main-text-area border border-black w-1/5 ">
        <div>
          <h2>Thread</h2>
        </div>
         
      </div>
    

    </section>
    
    
    </>
  )
}

