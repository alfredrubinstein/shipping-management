import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../forms.module.css';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { username, password, role });
      navigate('/login');
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert(error.response.data.message || 'Registration failed. Please try again.');
      } else if (error.request) {
        // The request was made but no response was received
        alert('No response received from server. Please try again.');
      } else {
        // Something happened in setting up the request that triggered an Error
        alert('An error occurred during registration.');
      }
      console.error('Registration error:', error);
    }
  };

  return (
    <>
    <div className={styles.title}>רישום משתמש חדש</div>
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
        id='password'
        // placeholder="סיסמה"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className={styles.inputField} 
      />
      
      <label className={styles.labelField} htmlFor="roleSelect">בחר סוג הרשאה...</label>
      <select id="roleSelect"
       value={role} onChange={(e) => setRole(e.target.value)} className={styles.selectField}> 
        <option value={'entryTypePermit'}>עמדת כניסה</option>
        <option value={'receptionTypePermit'}>עמדת קבלת ענבים</option>
        <option value={'labTypePermit'}>עמדת מעבדה</option>
        <option value={'admin'}>מנהל מערכת</option>
        <option value={'mashguiajTypePermit'}>משגיח</option>
        <option value={'vineyardTypePermit'}>אחראי כרם</option>
        
      </select>
      <button type="submit" className={styles.submitButton}> 
      רשום משתשמש
      </button>
    </form>
    </>
  );
};

export default RegisterForm;