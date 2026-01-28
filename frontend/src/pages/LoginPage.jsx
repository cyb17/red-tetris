import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function Login() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = e => {
    e.preventDefault();
    // 在这里处理登录逻辑
    console.log('Logging in:', { identifier, password });
  };

  const handleForgotPassword = () => {
    // 处理忘记密码逻辑
    alert('Fonctionnalité de récupération de mot de passe à venir');
  };

  return (
    <section>
      <div>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="identifier">Username / Email</label>
            <input
              type="text"
              id="identifier"
              placeholder="Enter your username or email"
              value={identifier}
              onChange={e => setIdentifier(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <button type="button" onClick={handleForgotPassword}>
              Forgot Password?
            </button>
            <button onClick={() => navigate(-1)} type="button">
              Back
            </button>
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </section>
  );
}
