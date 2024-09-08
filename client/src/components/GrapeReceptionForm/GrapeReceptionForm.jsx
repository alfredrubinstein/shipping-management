import React, { useState } from 'react';
import axios from 'axios';
import styles from '../forms.module.css';

const GrapeReceptionForm = ({addNewTime}) => {
  // const {addNewTime}=props;
  const [formData, setFormData] = useState({
    conductor: '',
    numberOfShipments:'',
    vineyardArea: '',
    vineyard: '',
    grapeVarieties: '',
    temperature: '',
    containers: '',
    arrivalTime: '',
    scrambled: false,
    rotten: false,
    comments: '',
  });

  const grapeVarieties = [
    'קריניאן',
    'מרלו',
    'קברנה סוביניון',
    'שרדונה',
    'סירה',
    'ויונייה',
    'גרנאש',
    'פינו נואר',
    'ריזלינג',
    'מוסקט',
    'טמפרניו',
    'זינפנדל',
    'פטיט סירה',
    'גווירצטרמינר'
  ];


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
    <>
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      {[
        { name: 'conductor', placeholder: 'נֶהָג', type: 'text' },
        { name: 'numberOfShipments', placeholder: 'מספר משלוח', type: 'number' },
        { name: 'vineyardArea', placeholder: 'אזור הכרם', type: 'text' },
        { name: 'vineyard', placeholder: 'מספר חלקה', type: 'text' },
        { name: 'containers', placeholder: 'מספר אמבטיות', type: 'text' },
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

<select
      className={styles.selectField}
        name="grapeVariety"
        value={formData.grapeVariety}
        onChange={handleChange}
        required
      >
        <option  value="" disabled>בחר סוג ענבים</option>
        {grapeVarieties.map((variety) => (
          <option key={variety} value={variety}>
            {variety}
          </option>
        ))}
      </select>

      
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
      <button type="button" className={styles.newTabButton} onClick={addNewTime}>
      פתח כרטיסיה חדשה
    </button>
    </form>
    </>
  );
};

export default GrapeReceptionForm;
