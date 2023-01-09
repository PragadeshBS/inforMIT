const Message = ({ message }) => {
  const dateTime = new Date(message.updatedAt);
  return (
    <div className="col-12 mx-2 border rounded p-3">
      <div>
        <h2>{message.title}</h2>
        <hr />
        <div className="my-3">{message.content}</div>
        <div className="small">
          <div className="text-muted">Posted by: {message.sender}</div>
          <div className="text-muted">
            On:{" "}
            {dateTime.getDate() +
              "/" +
              (dateTime.getMonth() + 1) +
              "/" +
              dateTime.getFullYear() +
              " " +
              dateTime.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Message;
