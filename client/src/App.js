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
                 {/* <Route path="/driver" element={<DriverPage />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
















