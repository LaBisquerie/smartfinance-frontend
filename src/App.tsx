import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import RegisterPage from './pages/Register';

export interface IAppProps {}

const App: React.FC<IAppProps> = (props) => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
    );
};

export default App;
