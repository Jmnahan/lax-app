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
    userEmail,
    channels,
    allUsers,
    loadUsers,
    setUserEmail,
    setChannelName,
    setId,
    channelNameError,
    setChannelNameError,
    handleCreateChannel,
  } = props
  const [searchUser, setSearchUser] = useState("")
  
  const [loading, setLoading] = useState()
  const [channelList, setChannelList] = useState([])
  const [channelIDList, setChannelIDList] = useState([])
  const [modalDM, setModalDM] = useState(false)

  const [ clickModal, setClickModal ] = useState(false);
  const [ emails, setEmails ] = useState([]);
  
  
  useEffect(()=> {
      setSearchUser(searchUser)
  },[searchUser])

  const getUserChannels = async () => {
    await axios
      .get(`/api/v1/channels`,{headers:{
        "access-token": localToken,
        client: localClient,
        expiry: localExpiry,
        uid: localUID
    }})
  }

  const onChannelClick = () => {
    
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

  const sendDMMessage = (user) => {

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
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setModalDM(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <form onSubmit={()=>sendDMMessage(searchUser)}>
                      <label className='text-black'>Send To...</label>
                      <input className ="border w-[80%] rounded-full" value={searchUser} onChange={(e)=> {setSearchUser(e.target.value)}}/>
                    </form>
                      <div>
                        {}
                      </div>
                    <ul>
                      {/* {allUsers.map((item, index) => ())} */}
                    </ul>
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