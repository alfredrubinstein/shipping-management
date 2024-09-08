import React, { useState } from 'react';
import axios from 'axios';
import styles from '../forms.module.css'; 

const LaboratoryForm = () => {
  const [chemicalData, setChemicalData] = useState({});

  const handleChange = (e) => {
    setChemicalData({
      ...chemicalData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/laboratorio', { chemicalData }, {
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
   <form onSubmit={handleSubmit} className={styles.formContainer}> 
      <input
        type="text"
        name="ph"
        placeholder="pH"
        onChange={handleChange}
        className={styles.inputField}
      />
      <input
        type="text"
        name="sugarLevel"
        placeholder="Sugar Level"
        onChange={handleChange}
        className={styles.inputField}
      />
      <button type="submit" className={styles.submitButton}>  
        Register Data
      </button>
<button type="button" className={styles.newTabButton}>
        Open New Tab
      </button>
    </form>
   </>
  );
};

export default LaboratoryForm;