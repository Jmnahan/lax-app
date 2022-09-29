const Chatmessages = (props) => {
  const { messageList } = props
  return (
    <div>
      {messageList.map((data) => (
          <div key={data.id}>
            <p>{data.body}</p>
          </div>
      ))}
    </div>
  );
};

export default Chatmessages;
