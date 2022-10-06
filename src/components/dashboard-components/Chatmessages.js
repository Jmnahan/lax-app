const Chatmessages = (props) => {
  const { messageList } = props
  return (
      <>
        {messageList?.map((data) => (
            <div className="ml-2 mb-5" 
              key={data.id}>
              <div className="text-xs mt-4">{data.sender.email}</div>
              <p className=" rounded-lg w-fit p-3 bg-purple-200">{data.body}</p>
            </div>
        ))}
      </>
  );
};

export default Chatmessages;
