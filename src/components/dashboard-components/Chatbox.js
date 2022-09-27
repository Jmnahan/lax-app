import { useState } from "react"

 const ChatBox = (props) => {
    const {channelName, channelID, client} = props
    const [message,setMessage] = useState()
  
    client.get(`?receiver_id=${channelID}1&receiver_class=User&body=${message}`)
    .then((response)=> {
      setMessage(response.data)
      console.log(response.data)
    })
  
  
  
    const toggleThread = () => {}
  
    
      return (
        <div className="_main-text-area w-3/5 ">
          <div className="_chat-header text-center py-5 border-b shadow-sm flex flex-row">
            <h2 className="grow">{channelName} Channel</h2>
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
  