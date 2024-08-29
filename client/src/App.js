import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import EntryPage from './pages/EntryPage/EntryPage';
import GrapeReceptionPage from './pages/GrapeReceptionPage/GrapeReceptionPage';
import LaboratoryPage from './pages/LaboratoryPage/LaboratoryPage';
import GeneralDataPage from './pages/GeneralDataPage/GeneralDataPage';
import styles from './App.module.css';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
            <Route path="/" element={<Home/>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/entrada" element={<EntryPage />} />
                <Route path="/recibimiento" element={<GrapeReceptionPage />} />
                <Route path="/laboratorio" element={<LaboratoryPage />} />
                <Route path="/general" element={<GeneralDataPage />} />
            </Routes>
        </Router>
    );
}

export default App;
