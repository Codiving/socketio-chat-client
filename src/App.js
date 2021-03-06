import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Chat, ChatRoom, Login, Menubar } from "./components";

const socket = io.connect("/");

const App = () => {
  const [login, setLogin] = useState(false);
  const [nickname, setNickname] = useState("");
  const [rooms, setRooms] = useState([]); // room list
  const [join, setJoin] = useState(null); // 내가 join한 room

  const onLeaveRoom = () => {
    socket.emit("leave-room", join, () => setJoin(null));
  };

  const onJoin = roomName => {
    socket.emit("join-room", roomName, () => setJoin(roomName));
  };

  const onHandleJoin = roomName => setJoin(roomName);

  const addRoom = roomName => setRooms(prev => [...prev, roomName]);

  const onSuccessCreateRoom = roomName => {
    socket.emit("create-room", roomName, () => {
      addRoom(roomName);
      onHandleJoin(roomName);
    });
  };

  const onHandleNickname = newNickname => setNickname(newNickname);

  const onSuccessLogin = () => {
    socket.emit("login");
    setLogin(true);
  };

  const onLoginSubmit = e => {
    e.preventDefault();
    socket.emit("nickname", nickname, onSuccessLogin);
  };

  useEffect(() => {
    socket.on("connect", () => {
      socket.on("remove-room", roomName => {
        setRooms(prev => prev.filter(item => item !== roomName));
      });

      socket.on("updateRooms", newRooms => {
        setRooms(newRooms);
      });
    });
  }, []);

  return (
    <div>
      {!login && (
        <Login
          nickname={nickname}
          onHandleNickname={onHandleNickname}
          onLoginSubmit={onLoginSubmit}
        />
      )}
      {login && (
        <div>
          <p>로그인 성공했습니다.</p>
          <Menubar
            onSuccessCreateRoom={onSuccessCreateRoom}
            join={join}
            onLeaveRoom={onLeaveRoom}
          />
          <div>
            {!Boolean(join) &&
              rooms.map((room, index) => (
                <ChatRoom key={index} roomName={room} onJoin={onJoin} />
              ))}
          </div>
          {join && (
            <div>
              <Chat roomName={join} socket={socket} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
