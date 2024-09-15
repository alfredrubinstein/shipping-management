import React, { useState } from 'react';
import axios from 'axios';
import styles from '../forms.module.css';
import style from './EntryForm.module.css';
import useArrayStore from '../../store';

const EntryForm = () => {
  const [isAutomatic, setIsAutomatic] = useState(true);
  const [formData, setFormData] = useState({
    entradaFabrica: {
      shipmentNumber: '',
      licensePlateNumber: '',
      fullTruckWeight: '',
      emptyTruckWeight: '',
      isAutomatic: true
    }
  });

  const { addElement } = useArrayStore((state) => ({
    addElement: state.addElement
  }));

  const handleToggle = () => {
    setIsAutomatic(!isAutomatic);
    setFormData(prevState => ({
      ...prevState,
      entradaFabrica: {
        ...prevState.entradaFabrica,
        isAutomatic: !isAutomatic
      }
    }));
  };

  const handleOnClick = () => {
    if (!formData.entradaFabrica.shipmentNumber) {
      alert('אנא הכנס מספר משלוח');
      return;
    }
    const shipmentNumber = formData.entradaFabrica.shipmentNumber;
    const time = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    
    addElement({ shipmentNumber, time });
    
    console.log(`Agregado al array: shipmentNumber=${shipmentNumber}, time=${time}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      entradaFabrica: {
        ...prevState.entradaFabrica,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form data:', formData);

    localStorage.setItem('entryData', JSON.stringify(formData));

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/grape', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('API response:', response.data);
      alert('Entrada registrada');
    } catch (err) {
      console.error('Error details:', err.response ? err.response.data : err.message);
      let errorMessage = 'Error al registrar la entrada';
      if (err.response) {
        errorMessage += ': ' + (err.response.data.message || JSON.stringify(err.response.data));
      } else if (err.request) {
        errorMessage += ': No se recibió respuesta del servidor';
      } else {
        errorMessage += ': ' + err.message;
      }
      alert(errorMessage);
    }
    }

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      {[
        { name: 'shipmentNumber', label: 'מספר משלוח', type: 'text', required: true },
        { name: 'licensePlateNumber', label: 'מספר רישוי משאית', type: 'text' },
        { name: 'fullTruckWeight', label: 'משקל משאית מלאה', type: 'number' },
        { name: 'emptyTruckWeight', label: 'משקל משאית ריקה', type: 'number' },
      ].map((field) => (
        <React.Fragment key={field.name}>
          <label className={styles.label} htmlFor={field.name}>
            {field.label}
          </label>
          <input
            id={field.name}
            type={field.type}
            name={field.name}
            value={formData.entradaFabrica[field.name]}
            onChange={handleChange}
            className={styles.inputField}
            required={field.required}
          />
        </React.Fragment>
      ))}
    <div className={style.toggleContainer}>
  <label className={style.toggleLabel}>
    {isAutomatic ? 'מערכת על אוטומט' : 'מערכת מופעלת באופן ידני'}
  </label>
  <label className={style.switch}>
    <input type="checkbox" checked={isAutomatic} onChange={handleToggle} />
    <span className={style.slider}></span>
  </label>
</div>

      <button type="button" className={styles.newTabButton} onClick={handleOnClick}>
        פתח כרטיסיה חדשה
      </button>
      <button type="submit" className={styles.submitButton}>
        רשום כניסה
      </button>
    </form>
  );
};

export default EntryForm;