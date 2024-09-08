import React, { useState } from 'react';
import styles from '../forms.module.css'
import axios from 'axios';

const KashrutForm = () => {
  const [formData, setFormData] = useState({
    licensePlateNumber: '',
    numberOfShipments: '',
    permitNumber: '',
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
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      {[
        { name: 'licensePlateNumber', placeholder: 'מספר רישוי משאית', type: 'text' },
        { name: 'numberOfShipments', placeholder: 'מספר משלוח', type: 'number' },
        { name: 'permitNumber', placeholder: 'מספר אישור', type: 'number' },
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
        אשר משלוח
      </button>
      <button type="button" className={styles.newTabButton}>
        פתח כרטיסיה חדשה
      </button>
    </form>
  );
};

export default KashrutForm;
