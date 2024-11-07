import React, { useState } from 'react';
import axios from 'axios';
import styles from './VineyardAnalysis.module.css';

const VineyardAnalysis = () => {
  const [driverPayment, setDriverPayment] = useState(null);
  const [vineyardPayment, setVineyardPayment] = useState(null);
  const [labResults, setLabResults] = useState([]);
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vineyardName, setVineyardName] = useState('');

  const fetchDriverPayment = async () => {
    try {
      const response = await axios.get(`/api/driver-payment/${vehiclePlate}`);
      setDriverPayment(response.data.driverPayment);
    } catch (error) {
      console.error('Error fetching driver payment:', error);
    }
  };

  const fetchVineyardPayment = async () => {
    try {
      const response = await axios.get(`/api/vineyard-payment/${vineyardName}`);
      setVineyardPayment(response.data.vineyardPayment);
    } catch (error) {
      console.error('Error fetching vineyard payment:', error);
    }
  };

  const fetchLabResults = async () => {
    try {
      const response = await axios.get(`/api/lab-results/${vineyardName}`);
      setLabResults(response.data);
    } catch (error) {
      console.error('Error fetching lab results:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Vineyard Management Analysis</h2>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Driver Payment</h3>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
            placeholder="Enter vehicle plate"
            className={styles.input}
          />
          <button onClick={fetchDriverPayment} className={`${styles.button} ${styles.buttonBlue}`}>
            Calculate
          </button>
        </div>
        {driverPayment !== null && (
          <p className={styles.result}>Driver Payment: ${driverPayment.toFixed(2)}</p>
        )}
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Vineyard Payment</h3>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={vineyardName}
            onChange={(e) => setVineyardName(e.target.value)}
            placeholder="Enter vineyard name"
            className={styles.input}
          />
          <button onClick={fetchVineyardPayment} className={`${styles.button} ${styles.buttonGreen}`}>
            Calculate
          </button>
        </div>
        {vineyardPayment !== null && (
          <p className={styles.result}>Vineyard Payment: ${vineyardPayment.toFixed(2)}</p>
        )}
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Laboratory Results</h3>
        <button onClick={fetchLabResults} className={`${styles.button} ${styles.buttonPurple}`}>
          Fetch Results
        </button>
        {labResults.length > 0 && (
          <div style={{ overflowX: 'auto' }}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tableHeader}>
                  <th className={styles.tableCell}>Shipment Number</th>
                  <th className={styles.tableCell}>pH</th>
                  <th className={styles.tableCell}>Sugar Level</th>
                  <th className={styles.tableCell}>Acidity Level</th>
                  <th className={styles.tableCell}>Alcohol Content</th>
                  <th className={styles.tableCell}>Color Intensity</th>
                  <th className={styles.tableCell}>Aroma Profile</th>
                </tr>
              </thead>
              <tbody>
                {labResults.map((result, index) => (
                  <tr key={index} className={styles.tableRow}>
                    <td className={styles.tableCell}>{result.shipmentNumber}</td>
                    <td className={styles.tableCell}>{result.ph}</td>
                    <td className={styles.tableCell}>{result.sugarLevel}</td>
                    <td className={styles.tableCell}>{result.acidityLevel}</td>
                    <td className={styles.tableCell}>{result.alcoholContent}</td>
                    <td className={styles.tableCell}>{result.colorIntensity}</td>
                    <td className={styles.tableCell}>{result.aromaProfile}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default VineyardAnalysis;