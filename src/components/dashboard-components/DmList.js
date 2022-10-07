

const DmList = (props) => {
  const { userList, setSelectedPage, setReceipient, setReceipientID} = props;



  return (
    <div>
     {userList.length > 0 ? userList
     .map((data)=> (
      setReceipientID(data.id),
      (<button className="pl-4 mt-4" onClick={() => {
      setReceipient(data.user)
      setSelectedPage("direct")
  }} key={data.id}>
    <span className="text-sm hover:bg-fuchsia-900 py-2 px-1" key={data.id}>{data.user}</span></button>))) : <div className="pl-4 text-sm mt-4">no users</div>}
    </div>
  );
};

export default DmList;
