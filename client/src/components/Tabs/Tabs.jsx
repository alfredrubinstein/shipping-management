import React from 'react';
import Tab from '../Tab/Tab';
import styles from './Tabs.module.css';
import useArrayStore from '../../store';  

export default function Tabs() {
  const shipments = useArrayStore((state) => state.array);

  return (
    <div className={styles.tabsContainer}>
      {shipments.map((shipment, index) => (
          <Tab key={index} shipment={shipment.shipmentNumber} time={shipment.time} />
        )
      )
      }
    </div>
  );
}





// return (
//   <div className={styles.tabsContainer}>
//     {shipments.length > 0 ? (
//       shipments.map((shipment, index) => (
//         <Tab key={index} shipment={shipment.shipmentNumber} time={shipment.time} />
//       ))
//     ) : (
//       <p>אין כרטיסיות שמורות!</p>  // Muestra un mensaje si no hay datos
//     )
//     }
//   </div>
// );
// }




