const Chatmessages = (props) => {
  const { messageList } = props
  const filtered = messageList?.filter((value, index, self) =>
  index === self.findIndex((t) => (
    t.id === value.id && t.body === value.body
  ))
)
  return (
    <>
    {<div className="overflow-y-auto	h-85">
      {filtered?.map((data) => (
          <div className="ml-2 mb-5" 
          key={data.id}>
            <div className="text-xs mt-4">{data.sender.email}</div>
            <p className=" rounded-lg w-fit p-3 bg-purple-200">{data.body}</p>
          </div>
      ))}
    </div>}
    </>
  );
};

export default Chatmessages;
