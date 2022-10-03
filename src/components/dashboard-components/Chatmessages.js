const Chatmessages = (props) => {
  const { messageList } = props
  return (
    <div className="overflow-auto">
      {messageList.map((data) => (
          <div className="ml-2 " 
          key={data.id}>
            <div className="text-xs mt-4">{data.sender.email}</div>
            <p className=" rounded-lg w-fit p-3 bg-purple-200">{data.body}</p>
          </div>
      ))}
    </div>
  );
};

export default Chatmessages;
