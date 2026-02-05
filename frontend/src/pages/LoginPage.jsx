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
    <section className="flex flex-col gap-8 min-h-120 max-w-3xl p-12 mx-4 sm:w-4/5 bg-(--color-bg-light) border border-(--color-border)">
      <h2 className="text-center text-2xl font-bold">LOGIN</h2>
      <form className="flex flex-col items-center gap-6" onSubmit={handleLogin}>
        <div className="flex flex-col gap-2">
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
        </div>
        <div className="mt-4 sm:mt-2">
          <Button name="Login" type="submit" />
        </div>

        <div className="flex flex-col mt-7 sm:mt-3 gap-4">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="mr-30 underline underline-offset-3 decoration-(--color-border)"
          >
            Forgot Password?
          </button>
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="mr-50 underline underline-offset-3 decoration-(--color-border) font-bold"
          >
            ← Back
          </button>
        </div>
      </form>
    </section>
  );
}
