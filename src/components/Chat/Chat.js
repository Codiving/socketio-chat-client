import { useState } from "react";

const Chat = props => {
  const { roomName } = props;
  const [chat, setChat] = useState("");
  const [list, setList] = useState([]); // 채팅 텍스트 list

  return (
    <div>
      <span>{roomName} 채팅방입니다.</span>
      <div>
        {list.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
      <form
        onSubmit={e => {
          e.preventDefault();
          setChat("");
        }}
      >
        <input value={chat} onChange={e => setChat(e.target.value)} />
      </form>
    </div>
  );
};

export default Chat;
