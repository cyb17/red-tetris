export default function Home() {
  // TODO: 将这些处理函数移到独立的文件中实现
  const handleLogin = () => {
    // 登录逻辑将在其他文件中实现
    console.log('Login clicked');
  };

  const handleSignUp = () => {
    // 注册逻辑将在其他文件中实现
    console.log('Sign Up clicked');
  };

  const handlePlayAsGuest = () => {
    // 游客模式逻辑将在其他文件中实现
    console.log('Play as Guest clicked');
  };

  return (
    <section>
      <div className="flex flex-col">
        <h1>TETRIS</h1>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleSignUp}>Sign Up</button>
        <button onClick={handlePlayAsGuest}>Play as Guest</button>
      </div>
    </section>
  );
}
