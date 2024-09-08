import React, { useState } from 'react';
import axios from 'axios';
import styles from '../forms.module.css';

const DriverForm = () => {
  const [formData, setFormData] = useState({
    shipmentNumber: '',
    driverName: '',
    vehiclePlate: '',
    contactNumber: '',
    vineyard: '',
    departureTime: '',
    arrivalTime: '',
    comments: '',
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

    // Imprimir datos del formulario en la consola
    console.log('Form data:', formData);

    // Guardar datos en localStorage
    localStorage.setItem('driverFormData', JSON.stringify(formData));

    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/chofer-uvas', formData, {
        headers: { Authorization: token },
      });
      alert('Información registrada correctamente');
    } catch (err) {
      console.error(err);
      alert('Error al registrar la información');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      {[
        { name: 'shipmentNumber', placeholder: 'מספר משלוח', type: 'text' },
        { name: 'driverName', placeholder: 'שם נהג', type: 'text' },
        { name: 'vehiclePlate', placeholder: 'מספר רישוי', type: 'text' },
        { name: 'contactNumber', placeholder: 'טלפון ליצירת קשר', type: 'tel' },
        { name: 'vineyard', placeholder: 'כרם מעמיס', type: 'text' },
        { name: 'departureTime', placeholder: 'שעת יציאה', type: 'time' },
        { name: 'arrivalTime', placeholder: 'שעת הגעה משוערת', type: 'time' },
      ].map((field) => (
        <input
          key={field.name}
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          value={formData[field.name]}
          onChange={handleChange}
          className={styles.inputField}
          required
        />
      ))}

      <textarea
        name="comments"
        placeholder="הודאות מיוחדות"
        value={formData.comments}
        onChange={handleChange}
        className={styles.textareaField}
      />

      <button type="submit" className={styles.submitButton}>שלח</button>
    </form>
  );
};

export default DriverForm;
