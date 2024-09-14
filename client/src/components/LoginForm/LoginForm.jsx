import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../forms.module.css'; 

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);

    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    try {
      const res = await axios.post('/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token); 
      navigate('/'); 
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert(error.response.data.message || 'Login failed. Please check your credentials.');
      } else if (error.request) {
        // The request was made but no response was received
        alert('No response received from server. Please try again.');
      } else {
        // Something happened in setting up the request that triggered an Error
        alert('An error occurred during login.');
      }
      console.error('Login error:', error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}> 
    <label htmlFor="username">שם משתמש:</label>
      <input
        type="text"
        id='username'
        // placeholder="שם משתמש"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className={styles.inputField} 
      />
      <label htmlFor="password">סיסמה:</label>
      <input
        type="password"
        // placeholder="סיסמה"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className={styles.inputField} 
      />
      <button type="submit" className={styles.submitButton}> 
        Login
      </button>
    </form>
  );
};

export default LoginForm;
