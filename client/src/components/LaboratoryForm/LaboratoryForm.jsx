import React, { useState } from 'react';
import axios from 'axios';
import style from './LaboratoryForm.module.css';
import styles from '../forms.module.css';
import useArrayStore from '../../store';

const LaboratoryForm = () => {
  const [chemicalData, setChemicalData] = useState([
    { name: 'shipmentNumber', value: '',type: 'text' },
    { name: 'ph', value: '' ,type: 'number'},
    { name: 'sugarLevel', value: '' ,type: 'number'},
    { name: 'acidityLevel', value: '',type: 'number' },
    { name: 'alcoholContent', value: '' ,type: 'number' },
    { name: 'colorIntensity', value: '',type: 'number' },
    { name: 'aromaProfile', value: '',type: 'text' },
  ]);
  
  const { array} = useArrayStore();
  
  const handleChange = (index, e) => {
    const updatedData = [...chemicalData];
    updatedData[index].value = e.target.value;
    setChemicalData(updatedData);
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
      if(array.length=== 0){
        alert('אין כרטיסיות פתוחות!');
        return;
      }
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
    <>
    <div className={style.LaboratoryForm}>
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      {chemicalData.map((input, index) => (
        <input
          key={input.name}
          type={input.type}
          name={input.name}
          placeholder={input.name.charAt(0).toUpperCase() + input.name.slice(1).replace(/([A-Z])/g, ' $1')}
          value={input.value}
          onChange={(e) => handleChange(index, e)}
          className={styles.inputField}
          id={style.rtl}
        />
      ))}

      <button type="submit" className={styles.submitButton} >
        Register Data
      </button>
    </form>
    </div>
    </>
  );
};

export default LaboratoryForm;
