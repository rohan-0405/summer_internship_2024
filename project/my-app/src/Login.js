import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };
  const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  );
  const validationSchema = z.object(
    {
    password: z
    .string()
    .min(1, { message: 'Must have at least 1 character' })
    .regex(passwordValidation, {
    message: 'Your password is not valid'
    };


  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to Watch Store</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="actions">
            <button type="submit">Login</button>
          </div>
          <div className="additional-links">
            <a href="#">Forgot Password?</a>
            <a href="#">Create an Account</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
