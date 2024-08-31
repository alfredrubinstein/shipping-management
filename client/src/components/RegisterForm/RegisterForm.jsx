import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterForm.module.css';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/register', { username, password, role });
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.registerForm}> 
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={styles.inputField} 
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.inputField} 
      />
      <select value={role} onChange={(e) => setRole(e.target.value)} className={styles.selectField}> 
        <option value={1}>עמדת כניסה</option>
        <option value={2}>עמדת קבלת ענבים</option>
        <option value={3}>עמדת מעבדה</option>
        <option value={4}>מנהל מערכת</option>
      </select>
      <button type="submit" className={styles.submitButton}> 
        Register
      </button>
    </form>
  );
};

export default RegisterForm;