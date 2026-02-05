import { useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '../components/Button';
import Input from '../components/Input';

export default function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    // 在这里处理登录逻辑
    console.log('Sign up:', { username, password });
  };

  return (
    <section className="flex flex-col gap-8 sm:gap-6 min-h-120 max-w-3xl p-12 mx-4 sm:w-4/5 bg-(--color-bg-light) border border-(--color-border)">
      <h2 className="text-center text-2xl font-bold">SIGN UP</h2>
      <form className="flex flex-col items-center gap-6" onSubmit={handleSignUp}>
        <div className="flex flex-col gap-2">
          <Input
            label="Username / email"
            type="text"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
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

          <Input
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="mt-4 sm:mt-1">
          <Button name="Register" type="submit" />
        </div>

        <div className="mr-50 mt-3 sm:mt-2">
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="underline underline-offset-3 decoration-(--color-border) font-bold"
          >
            ← Back
          </button>
        </div>
      </form>
    </section>
  );
}
