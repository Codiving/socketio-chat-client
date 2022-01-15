import { useEffect, useState } from "react";

const ChatWrapCss = {
  marginBottom: 10,
  width: 200,
  height: 300,
  overflowY: "scroll",
  border: "1px solid",
  padding: 3
};

const Chat = props => {
  const { roomName, socket } = props;
  const [chat, setChat] = useState("");
  const [list, setList] = useState([]); // 채팅 텍스트 list

  useEffect(() => {
    socket.on("join-msg", msg => {
      alert(msg);
    });

    socket.on("message", msg => {
      setList(prev => prev.concat({ me: false, text: msg }));
    });
  }, [socket]);

  return (
    <div>
      <span>{roomName} 채팅방입니다.</span>
      <div style={ChatWrapCss}>
        {list.map((item, index) => (
          <p key={index} style={item.me ? { textAlign: "right" } : {}}>
            {item.text}
          </p>
        ))}
      </div>
      <form
        onSubmit={e => {
          e.preventDefault();
          socket.emit("message", chat, roomName, () => {
            setList(prev => prev.concat({ me: true, text: chat }));
            setChat("");
          });
        }}
      >
        <input value={chat} onChange={e => setChat(e.target.value)} />
      </form>
    </div>
  );
};

export default Chat;
