import React, { useState } from 'react';
import styles from '../forms.module.css';
import axios from 'axios';
import useArrayStore from '../../store';


const KashrutForm = () => {
  const [formData, setFormData] = useState({
    shipmentNumber: '',
    licensePlateNumber: '',
    numberOfShipments: '',
    permitNumber: '',
  });

  
  const { addElement } = useArrayStore((state) => ({
    addElement: state.addElement
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form data:', formData);

    localStorage.setItem('kashrutFormData', JSON.stringify(formData));

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
        { name: 'shipmentNumber', placeholder: 'מספר משלוח', type: 'text', required: true },
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
      <button type="button" className={styles.newTabButton} onClick={handleOnClick}>
        פתח כרטיסיה חדשה
      </button>
    </form>
  );
};

export default KashrutForm;
