import React, { useState } from 'react';
import axios from 'axios';
import styles from '../forms.module.css';

const VineyardForm = () => {
  const [formData, setFormData] = useState({
  // shipmentNumber: '',
  vineyardName: '',
  vineyardArea: '',
  vineyard: '',
  harvestDate: '',
  isManualHarvest:'',
  grapeVariety: '',
  shipmentDate: '',
  conductor: '',
  vehiclePlate: '',
  containers: '',
  contactPerson: '',
  driverPhone: '',
  typeOfTruck:'',
  numberOfContainers: '',
  totalWeight: '',
  isKosher: false,
  isAuthorized: false,
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

    console.log('Form data:', formData);

    localStorage.setItem('vineyardFormData', JSON.stringify(formData));

    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/vinedo-grape', formData, {
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
        // { name: 'shipmentNumber', label: 'מספר משלוח', type: 'text' },
        { name: 'conductor', label: 'נֶהָג', type: 'text' },
        { name: 'vehiclePlate', label: 'מספר רישוי', type: 'text' },
        { name: 'vineyardName', label: 'שם הכרם', type: 'text' },
        { name: 'vineyardArea', label: 'אזור הכרם', type: 'text' },
        { name: 'vineyard', label: 'קוד חלקה', type: 'text' },
        { name: 'contactPerson', label: 'אחראי כרם', type: 'text' },
        { name: 'driverPhone', label: 'טלפון נהג', type: 'tel' },
        { name: 'typeOfTruck', label: 'סוג משאית', type: 'number' },
        { name: 'containers', label: 'מספר אמבטיות', type: 'number' },
        { name: 'totalWeight', label: 'משקל ענבים', type: 'number' },
        { name: 'harvestDate', label: 'שעת בצירה', type: 'time' },
        { name: 'shipmentDate', label: 'שעת משלוח', type: 'time' },
      ].map((field) => (
        <>
        <label key={field.name} className={styles.label} htmlFor={field.name}>
          {field.label}
        </label>
        <input
        id={field.name}
          key={field.name}
          type={field.type}
          name={field.name}
          label={field.label}
          value={formData[field.name]}
          onChange={handleChange}
          className={styles.inputField}
          required
        />
        </>
      ))}
<select
        className={styles.selectField}
name='isManualHarvest'
value={formData.isManualHarvest}
onChange={handleChange}
required
>
<option value="" disabled>בחר סוג בציר</option>
<option value='true'>ידני</option>
<option value='false'>מכני</option>
</select>

      <select
        className={styles.selectField}
        name="grapeVariety"
        value={formData.grapeVariety}
        onChange={handleChange}
        required
      >
        <option value="" disabled>בחר סוג ענבים</option>
        {grapeVarieties.map((variety) => (
          <option key={variety} value={variety}>
            {variety}
          </option>
        ))}
      </select>


      <label className={styles.labelField}>אישור משגיח</label>
      <input
        type="checkbox"
        name="isKosher"
        value={formData.isAuthorized}
        onChange={handleChange}
        className={styles.labelField}
      />

<label className={styles.labelField}>אישור מנהל</label>
      <input
        type="checkbox"
        name="isAuthorized"
        value={formData.isAuthorized}
        onChange={handleChange}
        className={styles.labelField}
      />


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
