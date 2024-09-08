import React, { useState } from 'react';
import axios from 'axios';
import styles from '../forms.module.css';
import useArrayStore from '../../store';

const LaboratoryForm = () => {
  const [chemicalData, setChemicalData] = useState([
    { name: 'shipmentNumber', value: '' },
    { name: 'ph', value: '' },
    { name: 'sugarLevel', value: '' },
    { name: 'acidityLevel', value: '' },
    { name: 'alcoholContent', value: '' },
    { name: 'colorIntensity', value: '' },
    { name: 'aromaProfile', value: '' }
  ]);

  
  const { addElement } = useArrayStore((state) => ({
    addElement: state.addElement
  }));

  const handleChange = (index, e) => {
    const updatedData = [...chemicalData];
    updatedData[index].value = e.target.value;
    setChemicalData(updatedData);
  };

  
  const handleOnClick = () => {
    if (!chemicalData.shipmentNumber) {
      alert('אנא הכנס מספר משלוח');
      return;
    }
    const shipmentNumber = chemicalData.shipmentNumber;
    const time = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    
    addElement({ shipmentNumber, time });
    
    console.log(`shipmentNumber=${shipmentNumber}, time=${time}`);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = chemicalData.reduce((acc, item) => {
      acc[item.name] = item.value;
      return acc;
    }, {});

    console.log('Submitting data:', dataToSubmit);

    localStorage.setItem('laboratoryData', JSON.stringify(dataToSubmit));

    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/laboratorio', dataToSubmit, {
        headers: { Authorization: token },
      });
      alert('Recorded laboratory data');
    } catch (err) {
      console.error(err);
      alert('Error recording laboratory data');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      {chemicalData.map((input, index) => (
        <input
          key={input.name}
          type="text"
          name={input.name}
          placeholder={input.name.charAt(0).toUpperCase() + input.name.slice(1).replace(/([A-Z])/g, ' $1')}
          value={input.value}
          onChange={(e) => handleChange(index, e)}
          className={styles.inputField}
        />
      ))}
      <button type="submit" className={styles.submitButton}>
        Register Data
      </button>
      <button type="button" className={styles.newTabButton}>
        Open New Tab
      </button>
    </form>
  );
};

export default LaboratoryForm;
