import { useEffect, useState } from 'react'
import CreateChannelModal from "./CreateChannelModal"
import Channel from './Channel'
import axios from "../../api/axios"

const SideBar = (props) => {
  const { handleLogOut, 
    setReceipient, 
    setReceipientID, 
    localClient,
    localToken,
    localUID,
    localExpiry,
    messageThread,
    setMessageThead,
    receipient,

    userEmail,
    channels,
    allUsers,
    loadUsers,
    setUserEmail,
    setChannelName,
    setId,
    onChannelClick,
    channelNameError,
    setChannelNameError,
    handleCreateChannel,
    chanCreateError,
    setChanCreateError,
  } = props

  

  const [loading, setLoading] = useState()
  const [channelList, setChannelList] = useState([])
  const [channelIDList, setChannelIDList] = useState([])
  const [modalDM, setModalDM] = useState(false)
  const [searchUser, setSearchUser] = useState("")

  const [ clickModal, setClickModal ] = useState(false);
  const [ emails, setEmails ] = useState([]);
  
  
let value =''
  const getUserChannels = async () => {
    await axios
      .get(`/api/v1/channels`,{headers:{
        "access-token": localToken,
        client: localClient,
        expiry: localExpiry,
        uid: localUID
    }})
  }



  const handleAddIds = (e) => {
    e.preventDefault()
    allUsers.forEach(users => {
      if (users.email === userEmail) {
        setId(users.id)
        setUserEmail(users.email)
        setEmails([...emails, userEmail])
        setUserEmail("")
      }
    });
  }

  useEffect(() => {
    if(localToken) {
      loadUsers()
    }
  },[])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (channelNameError) {
        setChannelNameError(false)
      } else if (!clickModal) {
        setEmails([])
      }
    }, 1000);
    return () => clearTimeout(timer)
  },[ channelNameError, setChannelNameError, clickModal])

  useEffect(() => {
    const timer = setTimeout(() => {
      if(chanCreateError) {
        setChanCreateError("");
      } 
    }, 2000);
    return () => clearTimeout(timer)
  },[chanCreateError, setChanCreateError]);
   
  useEffect(
    ()=> {loadUsers()},[]
  )

  useEffect(()=> {
    setSearchUser(searchUser)
  },[searchUser])

  const onSearch = (searchUser, searchID) =>{
    setSearchUser(searchUser)
    setReceipientID(searchID)
    setReceipient(searchUser)
  }

    const modalDMWindow = (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold text-black">
                      Send New Message
                    </h3>
                    
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                   
                      <label className='text-black'>Send To...</label>

                      <input type="text" className ="border w-[80%] rounded-full text-black" value={searchUser} onChange={(e) => setSearchUser(e.target.value)}/>

                      <ul className='dropdown text-black dropdown-menu min-w-max absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none'>
                        
                        {allUsers
                          .filter(item => {
                            const searchTerm = searchUser.toLowerCase();
                            const userid = item.uid.toLowerCase();
                             
                           return searchTerm && userid.startsWith(searchTerm) && userid !== searchTerm                           
                          })
                          .slice(0,5)
                          .map((item) => (
                          <div onClick = {()=>onSearch(item.uid, item.id)} className ="dropdown-item text-black text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100" key={item.id}>
                            {item.uid}
                          </div>))}

                      </ul>
                      
                      <textarea className='border text-black' value={value}></textarea>
                    <div>
                      
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setModalDM(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setModalDM(false)}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
    )

 
const DmList = (props) => {
  const {messageThread, setMessageThread, receipient} = props

  return <ul>
    {
      // messageThread.map(data => console.log(data))
    }
  </ul>
  

}

    return (
      <div className="_sidebar  w-1/5 bg-fuchsia-700 text-white">
        <div className="ml-2">
          <button onClick={handleLogOut}>LOGOUT</button>
        <div className="grid grid-cols-2 py-5">
          <h1 className="">Server Name</h1>
          <div>
            <button className="" onClick={()=> setModalDM(true)}>
             send new message
            </button>
            {modalDM ? modalDMWindow : null}
          </div>
        </div>
          <div className="grid grid-cols-2 py-5">
            Channels
            <button onClick={() => setClickModal(true)}>+</button>
            <CreateChannelModal
              clickModal={clickModal}
              setClickModal={setClickModal}
              handleAddIds={handleAddIds}
              setChannelName={setChannelName}
              emails={emails}
              userEmail={userEmail}
              setUserEmail={setUserEmail}
              channelNameError={channelNameError}
              handleCreateChannel={handleCreateChannel}
              chanCreateError={chanCreateError}
            />
            <div className="flex flex-col">
              <Channel
              channels={channels}
              onChannelClick={onChannelClick}
              />
            </div>
          </div>
          Direct Messages
          <div>
            <ul className="flex flex-col">
             {messageThread ? <DmList messageThread={messageThread} setMessageThead={setMessageThead} receipient ={receipient}/> : <div>no messages</div>}
            </ul>
          </div>
        </div> 
      </div>
  
    )
  }


  export default SideBar