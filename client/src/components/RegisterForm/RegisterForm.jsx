import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../forms.module.css';
import style from './RegisterForm.module.css';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('entryTypePermit');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      console.log('Attempting to register with:', { username, role });
      const response = await axios.post('http://localhost:5000/api/auth/register', { username, password, role });
      console.log('Registration response:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Detailed registration error:', error);
      if (error.response) {
        setError(`Server Error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        setError('Network Error: No response received from server. Please check your connection.');
      } else {
        setError(`Request Error: ${error.message}`);
      }
    }
  };

  return (
    <>
    <div className={styles.title}>רישום משתמש חדש</div>
    {error && <div className={style.errorMessage}>{error}</div>}
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