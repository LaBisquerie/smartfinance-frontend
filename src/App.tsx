import { Routes, Route } from 'react-router-dom';
import './App.scss';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import RegisterPage from './pages/Register';
import SettingsPage from './pages/Settings';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import { useAuth } from './context/AuthContext';
import TopPage from './components/TopPage';
import PrivateRoute from './utils/PrivateRoute';
import RevenuPage from './pages/Revenu';
import DepensePage from './pages/Depense';

export interface IAppProps { }

function App() {
    let { user } = useAuth();
    return (
        <>
            <div className="App">
                <div className={`${user != null ? 'app-container' : null}`}>
                    {user != null ? <Sidebar /> : null}
                    <div className={`w-100 ${user != null ? 'app-content' : null}`}>
                        {user != null ? <TopPage /> : null}
                        <Routes>
                            <Route path="/" element={
                                <PrivateRoute>
                                    <HomePage />
                                </PrivateRoute>
                            } />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path='/revenus' element={<PrivateRoute><RevenuPage /></PrivateRoute>} />
                            <Route path='/depenses' element={<PrivateRoute><DepensePage /></PrivateRoute>} />
                            <Route path='/settings' element={<PrivateRoute><SettingsPage /></PrivateRoute>} />

                        </Routes>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
export default App;
