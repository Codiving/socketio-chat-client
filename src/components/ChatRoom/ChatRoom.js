const ChatRoom = props => {
  const { roomName, onJoin } = props;
  return (
    <div
      onClick={() => onJoin(roomName)}
      style={{ width: 300, border: "1px solid", padding: 10, margin: 10 }}
    >
      <span>{roomName} 채팅방</span>
    </div>
  );
};

export default ChatRoom;
