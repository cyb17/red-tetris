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
    <section className="flex flex-col gap-6 border border-(--color-border) p-12 mt-15 mx-60">
      <h2 className="text-center text-2xl font-bold">SIGN UP</h2>
      <form className="flex flex-col m-auto gap-4" onSubmit={handleSignUp}>
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

        <div className="mt-4">
          <Button name="Register" type="submit" />
        </div>

        <div className="flex flex-col items-start gap-2 my-2">
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
