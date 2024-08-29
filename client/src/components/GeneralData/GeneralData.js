import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './GeneralData.module.css';

const GeneralData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/datos-generales', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (err) {
        console.error(err);
        // alert('Error getting general data');
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.generalData}> 
      {data.length > 0 ? (
        <ul className={styles.dataList}> 
          {data.map((item) => (
            <li key={item._id} className={styles.dataItem}>
              <p>{item.message}</p>
              <p>{item.date}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>!אין הודעות זמינות</p>
      )}
    </div>
  );
};

export default GeneralData;