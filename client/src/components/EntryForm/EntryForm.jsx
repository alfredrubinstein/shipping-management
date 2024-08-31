import React, { useState } from 'react';
import axios from 'axios';
import styles from './EntryForm.module.css';

const EntryForm = () => {
  const [formData, setFormData] = useState({
    licensePlateNumber: '',
    fullTruckWeight: '',
    emptyTruckWeight: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/entrada-fabrica', formData, {
        headers: { Authorization: token },
      });
      alert('Entrada registrada');
    } catch (err) {
      console.error(err);
      alert('Error al registrar la entrada');
    }
  };

  return (
    <form className={styles.entryForm} onSubmit={handleSubmit}>
      {[
        { name: 'licensePlateNumber', placeholder: 'מספר רישוי משאית', type: 'text' },
        { name: 'fullTruckWeight', placeholder: 'משקל משאית מלאה', type: 'number' },
        { name: 'emptyTruckWeight', placeholder: 'משקל משאית ריקה', type: 'number' },
      ].map((field) => (
        <input
          key={field.name}
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          value={formData[field.name]}
          onChange={handleChange}
          className={styles.inputField}
        />
      ))}
      <button type="submit" className={styles.submitButton}>
        רשום כניסה
      </button>
    </form>
  );
};

export default EntryForm;