

const DmList = (props) => {
  const { userList, setSelectedPage, setReceipient, setReceipientID} = props;
 
  const renderUserList = (list) => {
    return userList.length > 0 ? list.map(data => (<button className="pl-4 mt-4" 
                                    onClick ={()=> {setReceipient(data.user); setReceipientID(data.id); setSelectedPage("direct")}} 
                                    ><span className="text-sm hover:bg-fuchsia-900 py-2 px-1" key={data.id}>{data.user}</span></button>)) : <div>No Messages</div>
  }

  return (
    <div>
      {renderUserList(userList)}
    </div>
  );
};

export default DmList;
