
const DMModal = (props) => {
    const {searchUser, allUsers,setMessage, sendMessage, setSubmitMessage, message, setModalDM, setMessageObject, onSearch, setSearchUser, setNewReceiver} = props

    const searchForUsers = (listOfUsers) => {
      return listOfUsers
      .filter((item) => {
        const searchTerm = searchUser.toLowerCase();
        const userEmail = item.uid.toLowerCase();
        return (
          searchTerm &&
          userEmail.startsWith(searchTerm) &&
          userEmail !== searchTerm
        );
      })
      .slice(0, 5)
      .map((item) => (
        setNewReceiver(item.id),
        <button
        onClick={() => {
          onSearch(item);
          setMessageObject({ id: item.id, user: item.email });
        }}
        className="dropdown-item text-black text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent hover:bg-gray-100"
        key={item.id}>
          {item.uid}
        </button>
      ))
    }

    return (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h2 className="text-2xl text-black font-bold">
                  Send New Message
                </h2>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto flex flex-col">
                <label className="text-black font-medium">Send To:</label>

                <input
                  type="text"
                  className="w-[80%] text-black indent-1 mt-2 mb-4 border-b-2 outline-none border-fuchsia-700"
                  placeholder="meline@hotmail.com"
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                />

                <ul className="dropdown text-black dropdown-menu min-w-max absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none">
                  {searchForUsers(allUsers)}
                </ul>
                <div className="flex flex-col text-black mt-3">
                  <label className="font-medium">Message:</label>
                  <textarea
                    className="border text-black rounded-md indent-1 mt-2 w-max border-fuchsia-700 outline-fuchsia-800"
                    value={message}
                    cols="40"
                    rows="3"
                    placeholder="How are you?"
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  ></textarea>
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
                  className="bg-fuchsia-700  text-white active:bg-fuchsia-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    console.log(message);
                    setSubmitMessage(true);
                    sendMessage();
                  }}
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    );
  };

  export default DMModal