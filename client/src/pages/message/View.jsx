import axios from "axios";
import { useEffect, useState } from "react";
import Message from "../../components/message/Message";

const View = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const { userType, email } = JSON.parse(localStorage.getItem("user"));
    axios
      .get("/api/message/get", {
        params: {
          userType,
          email,
        },
      })
      .then((res) => setMessages(res.data.messages));
  }, []);
  return (
    <div className="container my-3">
      <h1 className="display-6">Announcements</h1>
      <div className="row">
        {messages &&
          messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
      </div>
    </div>
  );
};
export default View;
