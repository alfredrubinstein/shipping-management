import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../forms.module.css';
import style from './EntryForm.module.css';
import useArrayStore from '../../store';

const EntryForm = () => {
  const [isAutomatic, setIsAutomatic] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState(''); // Estado para el mensaje de conexión
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

  useEffect(() => {
    const fetchShipmentNumber = async () => {
      setConnectionStatus('מנסה להתחבר'); // Mensaje de "intentando conectar"
      const start = Date.now();
      
      const interval = setInterval(async () => {
        try {
          const response = await axios.get('/api/shipment-number'); // Cambia la URL al endpoint adecuado
          const shipmentNumber = response.data || '000000';
          
          // Actualiza el estado con el número de envío obtenido
          setFormData(prevState => ({
            ...prevState,
            entradaFabrica: {
              ...prevState.entradaFabrica,
              shipmentNumber
            }
          }));
          
          setConnectionStatus(''); // Limpiar el mensaje de estado si la conexión es exitosa
          clearInterval(interval); // Terminar el intento si se obtiene respuesta
        } catch (err) {
          const elapsed = Date.now() - start;
          if (elapsed >= 5000) { // Verifica si han pasado 5 segundos
            setConnectionStatus('החיבור נכשל');
            setFormData(prevState => ({
              ...prevState,
              entradaFabrica: {
                ...prevState.entradaFabrica,
                shipmentNumber: '000000'
              }
            }));
            clearInterval(interval); // Terminar el intento después de 5 segundos
          }
        }
      }, 1000); // Intentar cada segundo
    };

    if (isAutomatic) {
      fetchShipmentNumber();
    }
  }, [isAutomatic]);

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
  };

  return (
      <form className={isAutomatic ? styles.automaticForm : styles.formContainer} onSubmit={handleSubmit}>
<div className={style.toggleContainer}>
        <label className={style.toggleLabel}>
          {isAutomatic ? 'מערכת על אוטומט' : 'מערכת מופעלת באופן ידני'}
        </label>
        <label className={style.switch}>
          <input type="checkbox" checked={isAutomatic} onChange={handleToggle} />
          <span className={style.slider}></span>
        </label>
      </div>

      <label className={styles.label} htmlFor="shipmentNumber">
        מספר משלוח
      </label>
      <input
        id="shipmentNumber"
        type="text"
        name="shipmentNumber"
        value={
          isAutomatic
            ? connectionStatus || formData.entradaFabrica.shipmentNumber
            : formData.entradaFabrica.shipmentNumber
        }
        onChange={handleChange}
        className={styles.inputField}
        required
        disabled={isAutomatic}
      />
      
      {[
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
            disabled={isAutomatic}
          />
        </React.Fragment>
      ))}
      


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
