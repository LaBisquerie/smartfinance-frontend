import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';

export interface IAppProps {}

const App: React.FC<IAppProps> = (props) => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    );
};

export default App;
