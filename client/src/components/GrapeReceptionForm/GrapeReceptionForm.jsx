import React, { useState } from 'react';
import axios from 'axios';
import styles from '../forms.module.css';
import useArrayStore from '../../store';

const GrapeReceptionForm = () => {
  const [formData, setFormData] = useState({
   shipmentNumber: '',
  temperature: '',
  arrivalTime: '',
  departureTime: '',
  receivingTank: '',
  sentBy: '',
  scrambled: false,
  rotten: false,
  sulfitAdded1: false,
  sulfitAdded2: false,
  ensimesAdded: false,
  comments: '',
  });

  const { array} = useArrayStore();
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form data:', formData);

    localStorage.setItem('grapeReceptionData', JSON.stringify(formData));

    try {
      if(array.length=== 0){
        alert('אין כרטיסיות פתוחות!');
        return;
      }
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
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      {[
        { name: 'shipmentNumber', placeholder: 'מספר משלוח', type: 'text' ,value:'', required: true},
        { name: 'temperature', placeholder: 'טֶמפֶּרָטוּרָה', type: 'number' },
        { name: 'arrivalTime', placeholder: 'כניסה לעמדה', type: 'time' },
        { name: 'departureTime', placeholder: 'יציאה מהעמדה', type: 'time' },
        { name: 'receivingTank', placeholder: 'מיכל קבלה', type: 'text' },
        { name: 'sentBy', placeholder: 'מועבר דרך', type: 'text' },
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


      <textarea
        name="comments"
        placeholder="הודאות מיוחדות"
        value={formData.comments}
        onChange={handleChange}
        className={styles.textareaField}
      />

      {[
        { name: 'scrambled', label: 'זנים מעורבים' },
        { name: 'rotten', label: 'רקבונות' },
        { name: 'sulfitAdded1', label: 'התוסף סולפית 1' },
        { name: 'sulfitAdded2', label: 'התוסף סולפית 2' },
        { name: 'ensimesAdded', label: 'הוכנסו הנזימים' },
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
