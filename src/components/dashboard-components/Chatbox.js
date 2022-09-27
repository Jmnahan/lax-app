import { useState } from "react"
import axios from "../../api/axios"
 const ChatBox = (props) => {
   
    const [message,setMessage] = useState()
  

    const handleSubmit = (e) => {
        e.preventDefault()
        sendMessage()
        setMessage('')
    }
  

    const sendMessage = async () => {
        await axios.post(
            `/api/v1/messages?receiver_id=$&receiver_class=User&body=${message}`, {

            })
       
    }
  
    const toggleThread = () => {}
  
    
      return (
        <div className="_main-text-area w-3/5 ">
          <div className="_chat-header text-center py-5 border-b shadow-sm flex flex-row">
            <h2 className="grow"> Channel</h2>
            <div className="px-3">
              <button onClick={toggleThread}>toggle</button>
            </div>
          </div>
            <span className="_message-list-container">
                <div className="_receiver mx-2">
                  <div className="text-sm">
                    sender name
                  </div>
                  <div className="border border-black w-fit p-2 rounded">
                    message text
                  </div>
                </div>
            </span>

            <span className="_message-list-container">
                <div className="_receiver mx-2">
                  <div className="text-sm">
                    receiver name
                  </div>
                  <div className="border border-black w-fit p-2 rounded">
                    message text
                  </div>
                </div>
            </span>
  
            <span className="fixed bottom-0 p-3 border-t border-black shadow-sm w-3/5">
                <form onSubmit={handleSubmit}>
                    <input type="text" value= {message} onChange= {(e)=> e.target.value} className="border w-[80%] rounded-full"></input>
                </form>
            </span>
        </div>
      )
    }
  
export default ChatBox