import React from 'react';

import { Routes, Route } from 'react-router-dom';
import './App.scss';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import RegisterPage from './pages/Register';
import Footer from './components/Footer';

export interface IAppProps {}

const App: React.FC<IAppProps> = (props) => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
