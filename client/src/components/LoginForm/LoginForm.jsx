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
      const res = await axios.post('/api/login', { username, password });
      localStorage.setItem('token', res.data.token); 
      navigate('/'); 
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}> 
      <input
        type="text"
        placeholder="שם משתמש"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={styles.inputField} 
      />
      <input
        type="password"
        placeholder="סיסמה"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.inputField} 
      />
      <button type="submit" className={styles.submitButton}> 
        Login
      </button>
    </form>
  );
};

export default LoginForm;
