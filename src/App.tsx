import React from 'react';

import { Routes, Route } from 'react-router-dom';
import './App.scss';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import RegisterPage from './pages/Register';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

export interface IAppProps {}

function App() {
    const toto = false;
    if (!toto) {
        return (
            <>
                <div className="App">
                    <div className="app-container">
                        <Sidebar />
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="App not-logged">
                    <div className="app-container">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </>
        );
    }
}

export default App;
