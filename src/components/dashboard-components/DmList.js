

const DmList = (props) => {
  const { userList, setSelectedPage, setReceipient, setReceipientID} = props;



  return (
    <div>
     {userList.length > 0 ? userList
     .map((data)=> (
      setReceipientID(data.id),
      (<button className="pl-4" onClick={() => {
      setReceipient(data.user)
      setSelectedPage("direct")
  }} key={data.id}><span key={data.id}>{data.user}</span></button>))) : <div>no users</div>}
    </div>
  );
};

export default DmList;
