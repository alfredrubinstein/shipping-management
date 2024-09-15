import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './SearchComponent.module.css';

export default function SearchComponent() {
    const [searchCriteria, setSearchCriteria] = useState({
        startDate: '',
        endDate: '',
        shipmentNumber: '',
        truckNumber: '',
      });
      
      const [results, setResults] = useState([]);
      const [loading, setLoading] = useState(false);
    
      const mockData = [
        {
          shipmentDate: "2024-09-01",
          departureTime: "08:30",
          shipmentNumber: "12345",
          truckNumber: "AB-123-CD",
          driverName: "John Doe",
          vineyardName: "Vineyard A",
          grapeVariety: "Cabernet Sauvignon",
          totalWeight: 1000
        },
        {
          shipmentDate: "2024-09-01",
          departureTime: "09:00",
          shipmentNumber: "12346",
          truckNumber: "XY-789-ZW",
          driverName: "Jane Smith",
          vineyardName: "Vineyard B",
          grapeVariety: "Merlot",
          totalWeight: 1200
        }
      ];
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria({
          ...searchCriteria,
          [name]: value,
        });
      };
    
      const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          const token = localStorage.getItem('token');
          const { data } = await axios.get('/api/buscar-envios', {
            params: searchCriteria,
            headers: { Authorization: token },
          });
          setResults(data);
        } catch (err) {
          console.error("Fallo la solicitud principal, intentando con JSON Placeholder...");
          try {
            const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
            // Convertimos los datos de JSON Placeholder al formato esperado para los resultados
            setResults(mockData); // Usamos datos mock en lugar de JSON Placeholder en este caso
          } catch (error) {
            console.error("Fallo con JSON Placeholder, usando datos mock...");
            setResults(mockData);
          }
        } finally {
          setLoading(false);
        }
      };
    
  return (
    <div>
      
      <div className={styles.formTitle}>חיפוש משלוחים</div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          {[
            { name: 'startDate', label: 'תאריך התחלה', type: 'date' },
            { name: 'endDate', label: 'תאריך סוף', type: 'date' },
            { name: 'shipmentNumber', label: 'מספר משלוח', type: 'text' },
            { name: 'truckNumber', label: 'מספר רכב', type: 'text' },
          ].map((field) => (
            <div key={field.name} className={styles.inputGroup}>
              <label>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={searchCriteria[field.name]}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>
          ))}

          <button type="submit" className={styles.searchButton}>
            {loading ? 'מחפש...' : 'חפש'}
          </button>
        </form>

        {results.length > 0 && (
          <div className={styles.resultsContainer}>
            <h3>תוצאות חיפוש</h3>
            <table className={styles.resultsTable}>
              <thead>
                <tr>
                  <th>תאריך משלוח</th>
                  <th>שעת משלוח</th>
                  <th>מספר משלוח</th>
                  <th>מספר רכב</th>
                  <th>שם נהג</th>
                  <th>כרם שולח</th>
                  <th>סוג ענבים</th>
                  <th>משקל</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index}>
                    <td>{result.shipmentDate}</td>
                    <td>{result.departureTime}</td>
                    <td>{result.shipmentNumber}</td>
                    <td>{result.truckNumber}</td>
                    <td>{result.driverName}</td>
                    <td>{result.vineyardName}</td>
                    <td>{result.grapeVariety}</td>
                    <td>{result.totalWeight} kg</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
