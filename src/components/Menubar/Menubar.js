import { useState } from "react";

const Menubar = props => {
  const { onSuccessCreateRoom, onLeaveRoom, join } = props;
  const [roomName, setRoomName] = useState("");

  return (
    <div>
      {!Boolean(join) ? (
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
      ) : (
        <button onClick={onLeaveRoom}>방 나가기</button>
      )}
    </div>
  );
};

export default Menubar;
