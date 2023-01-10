import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import axios from "axios";
import styles from "../../styles/componentStyles/Message.module.css";

const Message = ({ message }) => {
  const [loading, setLoading] = useState(true);
  const [containsAttachment, setContainsAttachment] = useState(false);
  const [attachment, setAttachment] = useState(null);

  const downloadAttachment = () => {
    const data = Uint8Array.from(attachment.file.data);
    const content = new Blob([data.buffer], {
      type: attachment.contentType,
    });

    const encodedUri = window.URL.createObjectURL(content);
    const link = document.createElement("a");

    link.setAttribute("href", encodedUri);
    link.setAttribute("download", attachment.name);

    link.click();
  };

  useEffect(() => {
    if (message.attachment) {
      setContainsAttachment(true);
      axios
        .get("/api/message/attachment/" + message.attachment)
        .then((res) => {
          console.log(res.data);
          const attachment = res.data.attachment;
          setAttachment(attachment);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoading(false);
    }
  }, []);
  const dateTime = new Date(message.updatedAt);
  if (loading) return <div>Just a sec...</div>;
  return (
    <div className="col-12 m-2 border rounded p-3">
      <div>
        <h2>{message.title}</h2>
        <hr />
        <div className="my-3">{message.content}</div>
        {containsAttachment && (
          <div
            className={`my-3 ${styles.attachment}`}
            onClick={() => downloadAttachment()}
          >
            <i className="fs-6 lead">
              This announcment contains an attachment:
            </i>
            <div className="border w-50 p-3 rounded">
              {attachment.name}
              <span className="ms-3">
                <FaDownload />
              </span>
            </div>
          </div>
        )}
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
