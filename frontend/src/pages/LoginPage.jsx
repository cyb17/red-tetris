import { useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '../components/Button';
import Input from '../components/Input';

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
    <section className="flex flex-col gap-6 border border-(--color-border) p-8">
      <h2 className="text-center font-bold">LOGIN</h2>
      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        <Input
          label="Username / Email"
          type="text"
          id="identifier"
          value={identifier}
          onChange={e => setIdentifier(e.target.value)}
          required
        />

        <Input
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <Button name="Login" type="submit" />

        <div className="flex flex-col items-start gap-2 my-2">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="underline underline-offset-3 decoration-(--color-border)"
          >
            Forgot Password?
          </button>
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="underline underline-offset-3 decoration-(--color-border) font-bold"
          >
            Back
          </button>
        </div>
      </form>
    </section>
  );
}
