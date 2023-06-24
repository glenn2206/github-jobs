import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      if(response.ok) {
        navigate("/");
        localStorage.setItem("access_token", data.access_token);
      }
    } catch (error) {
      console.error(error);
    }
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="container">
        <h1>Login</h1>
        <label><b>Username</b></label>
        <input type="text" placeholder="Enter Username" value={username} onChange={handleUsernameChange}  required />
        <label><b>Password</b></label>
        <input type="password" placeholder="Enter Password" value={password} onChange={handlePasswordChange} />
        <button type="submit" class="loginbtn">Login</button>
      </div>
      <div class="container signup">
        <p>Dont have an account? <Link to="/register">Sign up</Link>.</p>
      </div>
    </form>
  );
};

export default Login;