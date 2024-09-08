import React from 'react'
import Tab from '../Tab/Tab';
import styles from './Tabs.module.css'

export default function Tabs() {
  //mock data
  const shipments = [
    { id: 1, time: '10:00', shipmentNumber: 'SHIP123', vehicleNumber: 'CAR456' },
    { id: 2, time: '11:00', shipmentNumber: 'SHIP456', vehicleNumber: 'CAR789' },
    { id: 3, time: '12:00', shipmentNumber: 'SHIP789', vehicleNumber: 'CAR123' },
    { id: 4, time: '13:00', shipmentNumber: 'SHIP123', vehicleNumber: 'CAR456' },
    { id: 5, time: '14:00', shipmentNumber: 'SHIP456', vehicleNumber: 'CAR789' }
  ];
  
  return (
    <div className={styles.tabsContainer}>
      {shipments.map((shipment) => (
     <Tab shipment={shipment.shipmentNumber} time={shipment.time}/>
      ))}
    </div>
  )
}












// import React, { useState } from 'react';
// import Tab from '../Tab/Tab';
// import styles from './Tabs.module.css';

// export default function Tabs() {
//   // Estado inicial vacío para el arreglo times
//   const [times, setTimes] = useState([]);

//   // Función para agregar un nuevo horario
//   const addNewTime = () => {
//     const newTime = {
//       id: times.length + 1,
//       time: `${10 + times.length}:00`
//     };
//     setTimes([...times, newTime]);
//   };

//   return (
//     <div className={styles.tabsContainer}>
//       {times.map((time) => (
//         <Tab key={time.id} time={time.time} />
//       ))}
//       <button 
//         type="button" 
//         className={styles.newTabButton}
//         onClick={addNewTime}
//       >
//         פתח כרטיסיה חדשה
//       </button>
//     </div>
//   );
// }

