import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../register.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!username || !email || !password || !confirmPassword) {
      return toast.error('All fields are required');
    }

    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    try {
      const response = await axios.post('http://20.235.152.209/api/register/', {
        username,
        email,
        password,
        confirmPassword,
      });
      if (response.data.token) {
        // Store token in local storage
        localStorage.setItem('token', response.data.token);
        toast.success('Registration successful. Please log in.');
        navigate('/');
      } else {
        toast.error(response.data.username[0]);
      }
    } catch (error) {
      console.error('Error occurred during registration:', error);
      toast.error('An error occurred during registration');
    }
  };

  return (
    <div className="register-container">
      <ToastContainer />
      <div className="register-content">
        <h2 className='text-center heading'>Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
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
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              minLength="6" 
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
              minLength="6" 
              required
            />
          </div>
          <div className='text-center'>
          <a href="register/" className="custom-button "  >
  <button type="submit" className="btn btn-primary">Register</button>
</a>
          </div>
        
        </form>
        <div className="login-options">
          <p>Already have an account? <Link to="/">Login</Link></p>
        </div>
      </div>
    </div>
  );
}
