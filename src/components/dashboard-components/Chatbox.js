import { data } from "autoprefixer"
import { useState, useEffect } from "react"
import axios from "../../api/axios"
 const ChatBox = (props) => {
   
    const [message,setMessage] = useState('')
    const localHeaders = JSON.parse(localStorage.getItem('localUsers'))

    const localClient = localHeaders[0].client
    const localToken = localHeaders[0].accessToken
    const localID = localHeaders[0].id
    const localUID = localHeaders[0].uid
    const localExpiry = localHeaders[0].expiry

    useEffect(()=>{
      setMessage(message)
    },[message])

    const handleSubmit = (e) => {
        e.preventDefault()
        sendMessage()
        setMessage('')
    }
  
    const sendMessage = async () => {
      const newMessage = {
        receiver_id: 1,
        receiver_class: "User",
        body: message
      }

      await axios.post(`/api/v1/messages`, newMessage, 
      {headers: {
        client: localClient,
        exipry: localExpiry,
        "access-token": localToken,
        uid: localUID,
      }})
       .then(response => {console.log(response.data)})
    }



    const receiveMessage = async () => {
      await axios.get(`/api/v1/messages?receiver_id=1&receiver_class=User`, 
      {headers: {
        "access-token": localToken,
        client: localClient,
        exipry: localExpiry,
        uid: localUID,
      }})
       .then(response => {
        if (response.data.length !== 0) {
          
          const listMessages = response.data
          const listedMessage = []

          listMessages.forEach(listMessage => {
            listedMessage.push(listMessage)
          })
          

        }
       })
    }

    receiveMessage()
  
    const toggleThread = () => {}
  
    
    // listedMessage.map((message)=> {

    // })


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
                    <input type="text" value= {message} onChange = {(e)=> setMessage(e.target.value)} className="border w-[80%] rounded-full"></input>
                </form>
            </span>
        </div>
      )
    }
  
export default ChatBox