import { useState } from "react";

const Menubar = props => {
  const { onSuccessCreateRoom } = props;
  const [roomName, setRoomName] = useState("");

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSuccessCreateRoom(roomName);
        }}
      >
        <input
          placeholder="방 만들기"
          value={roomName}
          onChange={e => setRoomName(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Menubar;
