const Login = props => {
  const { nickname, onHandleNickname, onLoginSubmit } = props;

  return (
    <div>
      <form onSubmit={onLoginSubmit}>
        <input
          placeholder="Nickname"
          value={nickname}
          onChange={e => {
            onHandleNickname(e.target.value);
          }}
          required
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;
