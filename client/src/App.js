import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import EntryPage from './pages/EntryPage/EntryPage';
import GrapeReceptionPage from './pages/GrapeReceptionPage/GrapeReceptionPage';
import LaboratoryPage from './pages/LaboratoryPage/LaboratoryPage';
import GeneralDataPage from './pages/GeneralDataPage/GeneralDataPage';
import DirectorPage from './pages/DirectorPage/DirectorPage';
import VineYard from './pages/VineYard/VineYard';
import DriverPage from './pages/DriverPage/DriverPage';

function App() {
    
  const [times, setTimes] = useState([]);
  const addNewTime = () => {
    const newTime = {
      id: times.length + 1,
      time: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
    };
    setTimes([...times, newTime]);
    console.log(newTime);
  };

  
    return (
        <Router>
            <Header />
            <Routes>
            <Route path="/" element={<Home/>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/entrada" element={<EntryPage />} />
                <Route path="/recibimiento" element={<GrapeReceptionPage/>} />
                <Route path="/laboratorio" element={<LaboratoryPage/>} />
                 <Route path="/vineyard" element={<VineYard />} />
                <Route path="/general" element={<GeneralDataPage />} />
                 <Route path="/director" element={<DirectorPage />} />
                 <Route path="/driver" element={<DriverPage />} />


            </Routes>
        </Router>
    );
}

export default App;
















// Para lograr que todos los componentes que reciben el prop `addNewTime` tengan un botón que agregue una ventana estilada con la opción de ser vista a lo largo de toda la jerarquía, necesitas hacer algunos ajustes en tu código. Aquí está el enfoque general que puedes seguir:

// 1. **Crear un componente modal**: Este componente representará la ventana estilada que quieres mostrar. Asegúrate de que sea capaz de mostrarse en cualquier parte de la aplicación.

// 2. **Actualizar los componentes que reciben `addNewTime`**: Estos componentes deben ser capaces de mostrar el modal cuando el botón es presionado.

// 3. **Gestionar el estado del modal en el componente principal**: Para permitir que el modal sea visible en toda la jerarquía, necesitarás manejar su estado en el componente principal y pasarlo a los componentes descendientes si es necesario.

// Aquí está un ejemplo de cómo podrías implementar esto:

// ### Paso 1: Crear el Componente Modal

// ```jsx
// // components/Modal/Modal.js
// import React from 'react';
// import './Modal.css'; // Puedes añadir tu propio estilo aquí

// const Modal = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         {children}
//         <button onClick={onClose}>Close</button>
//       </div>
//     </div>
//   );
// };

// export default Modal;
// ```

// ### Paso 2: Crear el Estilo para el Modal

// ```css
// /* components/Modal/Modal.css */
// .modal-overlay {
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }

// .modal-content {
//   background: white;
//   padding: 20px;
//   border-radius: 5px;
//   width: 80%;
//   max-width: 500px;
// }
// ```

// ### Paso 3: Actualizar el Componente Principal `App`

// En tu componente principal, puedes manejar el estado del modal:

// ```jsx
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header/Header';
// import Home from './pages/Home/Home';
// import LoginPage from './pages/LoginPage/LoginPage';
// import RegisterPage from './pages/RegisterPage/RegisterPage';
// import EntryPage from './pages/EntryPage/EntryPage';
// import GrapeReceptionPage from './pages/GrapeReceptionPage/GrapeReceptionPage';
// import LaboratoryPage from './pages/LaboratoryPage/LaboratoryPage';
// import GeneralDataPage from './pages/GeneralDataPage/GeneralDataPage';
// import KasrutPage from './pages/KashrutPage/KashrutPage';
// import DirectorPage from './pages/DirectorPage/DirectorPage';
// import VineYard from './pages/VineYard/VineYard';
// import DriverPage from './pages/DriverPage/DriverPage';
// import Modal from './components/Modal/Modal';

// function App() {
//   const [times, setTimes] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const addNewTime = () => {
//     const newTime = {
//       id: times.length + 1,
//       time: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
//     };
//     setTimes([...times, newTime]);
//     console.log(newTime);
//   };

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   return (
//     <Router>
//       <Header />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/entrada" element={<EntryPage />} />
//         <Route path="/recibimiento" element={<GrapeReceptionPage onClick={openModal} />} />
//         <Route path="/laboratorio" element={<LaboratoryPage onClick={openModal} />} />
//         <Route path="/vineyard" element={<VineYard />} />
//         <Route path="/general" element={<GeneralDataPage />} />
//         <Route path="/kashrut" element={<KasrutPage onClick={openModal} />} />
//         <Route path="/director" element={<DirectorPage />} />
//         <Route path="/driver" element={<DriverPage />} />
//       </Routes>
//       <Modal isOpen={isModalOpen} onClose={closeModal}>
//         <h2>Time Added</h2>
//         <button onClick={addNewTime}>Add New Time</button>
//       </Modal>
//     </Router>
//   );
// }

// export default App;
// ```

// ### Paso 4: Actualizar los Componentes Hijos

// Finalmente, actualiza los componentes que reciben `onClick` (como `GrapeReceptionPage`, `LaboratoryPage`, etc.) para que simplemente llamen a la función `onClick` proporcionada cuando se haga clic en el botón:

// ```jsx
// // pages/GrapeReceptionPage/GrapeReceptionPage.js
// import React from 'react';

// const GrapeReceptionPage = ({