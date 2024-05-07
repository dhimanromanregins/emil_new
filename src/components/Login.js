import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../login.css"

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://20.235.152.209/api/login/', {
        username,
        password,
      });
      if (response.data.token) { 
        console.log(response.data.user.id , '==================')
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user.id);
        toast.success('Login successful');
        navigate('/dashboard');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      toast.error('An error occurred during login');
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />

      <div className="login-content">
        <h2 className='text-center heading' >Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className='text-center'>
          <button type="submit" className="btn btn-primary">Login</button>
          </div>
        
        </form>
        <div className="login-options">
          <p>Don't have an account? <a href="/register">Sign up</a></p>
          <p>Forgot your password? <a href="/reset-password">Reset password</a></p>
        </div>
      </div>
    </div>
  );
}
