import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Login } from "./components";

const socket = io.connect("/");

const App = () => {
  const [login, setLogin] = useState(false);
  const [nickname, setNickname] = useState("");

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
    socket.on("connect", () => {});
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
      {login && <div>로그인 성공</div>}
    </div>
  );
};

export default App;
