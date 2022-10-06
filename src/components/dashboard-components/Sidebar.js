import { useEffect, useState } from 'react'
import CreateChannelModal from "./CreateChannelModal"
import Channel from './Channel'
import axios from "../../api/axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPenToSquare, faRightFromBracket, faPlus } from '@fortawesome/free-solid-svg-icons'

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
    setSelectedPage
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
                          <div onClick = {()=>onSearch(item.uid, item.id)} className ="dropdown-item text-black text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparenthover:bg-gray-100" key={item.id}>
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
      <div className="w-1/5 bg-fuchsia-700 text-white border-r border-gray-400 flex-wrap">
        <div className="bg-fuchsia-900 w-full py-5 border-b border-gray-400">
          <div className="flex border-b border-gray-400">
            <h1 className="text-3xl  w-full pl-4 pb-2 pt-1 font-bold text-cyan-300">Group 2</h1>
            <button className="mr-8 px-2 mt-2 mb-2 rounded-full bg-fuchsia-600" onClick={()=> setModalDM(true)}>
              <span className="text-gray-400">
                <FontAwesomeIcon icon={faPenToSquare}/>
              </span>
            </button>
            {modalDM ? modalDMWindow : null}
          </div>
          <h3 className="text-lg ml-4 mt-3 font-medium text-cyan-400">
            <span className="text-gray-400 mr-1">
              <FontAwesomeIcon icon={faUser}/> 
            </span>
            {localUID}
          </h3>
          <button className="ml-4 pt-1" onClick={handleLogOut}>
            <span className="mr-1 text-gray-400">
            <FontAwesomeIcon icon={faRightFromBracket} /> 
            </span>
            Log out
          </button>
        </div>
        <div className="py-5">
          <div className="flex justify-between pb-1 pl-4">
            <h3 className="text-lg font-medium text-cyan-300">Channels</h3>
            <button className="mr-8 px-2 h-8 rounded-full bg-fuchsia-600" onClick={() => setClickModal(true)}>
              <span className="text-gray-400 text-lg">
                <FontAwesomeIcon icon={faPlus} />
              </span>
            </button>
          </div>
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
          <div className="flex flex-col pr-1 py-2 border-b pl-4 border-gray-400">
            <Channel
            channels={channels}
            onChannelClick={onChannelClick}
            />
          </div>
          </div>
          <h3 className="pl-4 text-lg font-medium text-cyan-300">Direct Messages</h3>
          <button className="pl-4" 
            onClick={() => setSelectedPage("direct")}>
            CLICK ME
          </button>
          <div>
            <ul className="flex flex-col">
             {messageThread ? <DmList messageThread={messageThread} setMessageThead={setMessageThead} receipient ={receipient}/> : <div>no messages</div>}
            </ul>
          </div>
      </div>
    )
  }


  export default SideBar