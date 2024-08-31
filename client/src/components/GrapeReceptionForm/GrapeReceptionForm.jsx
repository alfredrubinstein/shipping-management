import React, { useState } from 'react';
import axios from 'axios';
import styles from './GrapeReceptionForm.module.css';

const GrapeReceptionForm = () => {
  const [formData, setFormData] = useState({
    conductor: '',
    numberOfShipments:'',
    vineyardArea: '',
    vineyard: '',
    grapeType: '',
    temperature: '',
    containers: '',
    arrivalTime: '',
    scrambled: false,
    rotten: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/recibimiento-uvas', formData, {
        headers: { Authorization: token },
      });
      alert('קבלה רשומה');
    } catch (err) {
      console.error(err);
      alert('שגיאה ברישום הקבלה');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.grapeReceptionForm}>
      {[
        { name: 'conductor', placeholder: 'נֶהָג', type: 'text' },
        { name: 'numberOfShipments', placeholder: 'מספר משלוח', type: 'number' },
        { name: 'vineyardArea', placeholder: 'אזור הכרם', type: 'text' },
        { name: 'vineyard', placeholder: 'מספר חלקה', type: 'text' },
        { name: 'containers', placeholder: 'מספר אמבטיות', type: 'text' },
        { name: 'grapeType', placeholder: 'סוג ענבים', type: 'text' },
        { name: 'temperature', placeholder: 'טֶמפֶּרָטוּרָה', type: 'number' },
        { name: 'arrivalTime', placeholder: 'כניסה לעמדה', type: 'time' },
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



      {[
        { name: 'scrambled', label: 'זנים מעורבים' },
        { name: 'rotten', label: 'רקבונות' },
      ].map((checkbox) => (
        <label key={checkbox.name}>
          <input 
            type="checkbox"
            name={checkbox.name}
            checked={formData[checkbox.name]}
            onChange={handleChange}
            />
          {checkbox.label}
        </label>
      ))}

      <button type="submit" className={styles.submitButton}>רשום קבלה</button>
    </form>
  );
};

export default GrapeReceptionForm;
