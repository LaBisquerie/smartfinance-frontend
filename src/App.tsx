import React from 'react';
import './App.scss';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <Sidebar />
        <div className="page-content"></div>
      </div>
      <Footer />
    </div>
  );
}

export default App;