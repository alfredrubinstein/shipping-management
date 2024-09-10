import React, { useState } from 'react';
import axios from 'axios';
import styles from '../forms.module.css';
import style from './EntryForm.module.css';
import useArrayStore from '../../store';


const EntryForm = () => {

  const [isAutomatic, setIsAutomatic] = useState(true);

  const [formData, setFormData] = useState({
    shipmentNumber: '',
    licensePlateNumber: '',
    fullTruckWeight: '',
    emptyTruckWeight: '',
  });

  const handleToggle = () => {
    setIsAutomatic(!isAutomatic);
  };

  const { addElement } = useArrayStore((state) => ({
    addElement: state.addElement
  }));


  const handleOnClick = () => {
    if (!formData.shipmentNumber) {
      alert('אנא הכנס מספר משלוח');
      return;
    }
    const shipmentNumber = formData.shipmentNumber;
    const time = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    
    addElement({ shipmentNumber, time });
    
    console.log(`Agregado al array: shipmentNumber=${shipmentNumber}, time=${time}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form data:', formData);

    localStorage.setItem('entryData', JSON.stringify(formData));

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
    <>
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      {[
        { name: 'shipmentNumber', placeholder: 'מספר משלוח', type: 'text' , required: true},
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
    </>
  );
};

export default EntryForm;
