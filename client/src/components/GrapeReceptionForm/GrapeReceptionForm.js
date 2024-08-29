import React, { useState } from 'react';
import axios from 'axios';
import styles from './GrapeReceptionForm.module.css'; 

const GrapeReceptionForm = () => {
const [conductor, setConductor] = useState('');
    const [vineyardArea, setVineyardArea] = useState('');
    const [vineyard, setVineyard] = useState('');
  const [grapeType, setGrapeType] = useState('');
  const [temperature, setTemperature] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/recibimiento-uvas', { conductor, vineyard, vineyardArea, grapeType, temperature }, {
        headers: { Authorization: token },
      });
      alert('Registered reception');
    } catch (err) {
      console.error(err);
      alert('Error when registering the receipt');
    }
  };

  return (

    <form onSubmit={handleSubmit} className={styles.grapeReceptionForm}> 
      <input
        type="text"
        placeholder="נֶהָג"
        value={conductor}
        onChange={(e) => setConductor(e.target.value)}
        className={styles.inputField} 
      />
      <input
        type="text"
        placeholder="אזור הכרם"
        value={vineyardArea}
        onChange={(e) => setVineyardArea(e.target.value)}
        className={styles.inputField} 
      />
      <input
        type="text"
        placeholder="מספר חלקה"
        value={vineyard}
        onChange={(e) => setVineyard(e.target.value)}
        className={styles.inputField} 
      />
      <input
        type="text"
        placeholder="סוג ענבים"
        value={grapeType}
        onChange={(e) => setGrapeType(e.target.value)}
        className={styles.inputField} 
      />
      <input
        type="number"
        placeholder="טֶמפֶּרָטוּרָה"
        value={temperature}
        onChange={(e) => setTemperature(e.target.value)}
        className={styles.inputField}
      />
      <label>
        <input type="checkbox" name="scrambled" value="זנים מעורבים" />
        זנים מעורבים
        </label>

        <label>
            <input type="checkbox" name="rotten" value="רקבונות" />
            רקבונות
            </label>

      <button type="submit" className={styles.submitButton}> 
        רשום קבלה
      </button>
    </form>
  );
};

export default GrapeReceptionForm;