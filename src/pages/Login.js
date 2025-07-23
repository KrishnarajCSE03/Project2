import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';
import { FaUser, FaLock } from 'react-icons/fa';
import Swal from 'sweetalert2';
import API from '../config/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await API.post('/auth/login', { email, password });

    const { token, user } = response.data;

    // Store in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('storeId', user.storeId);
    localStorage.setItem('role', user.role);

    // Set token for future requests
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    Swal.fire({
      title: 'Login Successful!',
      icon: 'success',
      confirmButtonText: 'Continue',
    }).then(() => {
      if (user.isTempPassword) {
        navigate('/welcome');
      } else if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'biller') {
        navigate('/biller');
      } else {
        navigate('/');
      }
    });
  } catch (error) {
    Swal.fire({
      title: 'Login Failed',
      text: error.response?.data?.error || 'Invalid credentials',
      icon: 'error',
      confirmButtonText: 'Try Again',
    });
  }
};

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form animated-form">
        <h2>Welcome</h2>

        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="email"
            placeholder="Email id"
            value={email}
            className="email-input"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            className="password-input"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-btn">Login</button>
       <p className="forgot">
      <Link to="/forgot-password">Forgot your password?</Link>
</p>
      </form>
    </div>
  );
};

export default LoginPage;
