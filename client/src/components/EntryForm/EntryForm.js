import React, { useState } from 'react';
import axios from 'axios';
import styles from './EntryForm.module.css'; 

const EntryForm = () => {
    const [emptyTruckWeight, setEmptyTruckWeight] = useState('');
    const [fullTruckWeight, setFullTruckWeight] = useState('');
const [licensePlateNumber, setLicensePlateNumber] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/entrada-fabrica', { emptyTruckWeight, fullTruckWeight, licensePlateNumber }, {
                headers: { Authorization: token }
            });
            alert('Entrada registrada');
        } catch (err) {
            console.error(err);
            alert('Error al registrar la entrada');
        }
    };

    return (
        <form className={styles.entryForm} onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="מספר רישוי משאית"
                value={licensePlateNumber}
                onChange={(e) => setLicensePlateNumber(e.target.value)}
                className={styles.inputField}
            />
                <input
                type="text"
                placeholder="מספר משלוח"
                value={licensePlateNumber}
                onChange={(e) => setLicensePlateNumber(e.target.value)}
                className={styles.inputField}
            />
            <input
                type="number"
                placeholder="משקל משאית מלאה"
                value={fullTruckWeight}
                onChange={(e) => setFullTruckWeight(e.target.value)}
                className={styles.inputField}
            />
               <input
                type="number"
                placeholder="משקל משאית ריקה"
                value={emptyTruckWeight}
                onChange={(e) => setEmptyTruckWeight(e.target.value)}
                className={styles.inputField}
            />
            <button type="submit" className={styles.submitButton}>
                רשום כניסה
            </button>
        </form>
    );
};

export default EntryForm;
