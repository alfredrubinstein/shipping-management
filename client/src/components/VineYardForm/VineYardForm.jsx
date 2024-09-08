import React, { useState } from 'react';
import axios from 'axios';
import styles from '../forms.module.css';

const VineyardForm = () => {
  const [formData, setFormData] = useState({
    shipmentNumber: '',
    vineyardName: '',
    vineyardLocation: '',
    contactPerson: '',
    contactNumber: '',
    grapeVariety: '',
    harvestDate: '',
    shipmentDate: '',
    numberOfContainers: '',
    totalWeight: '',
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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/vinedo-uvas', formData, {
        headers: { Authorization: token },
      });
      alert('רישום מוצלח');
    } catch (err) {
      console.error(err);
      alert('טעות ברישום');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      {[
      {name: 'shipmentNumber', placeholder: 'מספר משלוח', type: 'text'},
        { name: 'vineyardName', placeholder: 'שם היקב', type: 'text' },
        { name: 'vineyardLocation', placeholder: 'מיקום היקב', type: 'text' },
        { name: 'contactPerson', placeholder: 'אחראי יקב', type: 'text' },
        { name: 'contactNumber', placeholder: 'טלפון ליצירת קשר', type: 'tel' },
        { name: 'harvestDate', placeholder: 'שעת בצירה', type: 'time' },
        { name: 'shipmentDate', placeholder: 'שעת משלוח', type: 'time' },
        { name: 'numberOfContainers', placeholder: 'מספר אמבטיות', type: 'number' },
        { name: 'totalWeight', placeholder: 'משקל ענבים', type: 'number' },
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

      <select
      className={styles.selectField}
        name="grapeVariety"
        value={formData.grapeVariety}
        onChange={handleChange}
        required
      >
        <option className={styles.selectField} value="" disabled>בחר סוג ענבים</option>
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

      <button type="submit" className={styles.submitButton}>שלח טופס</button>
    </form>
  );
};

export default VineyardForm;
