import { Routes, Route } from 'react-router-dom';
import './App.scss';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import RegisterPage from './pages/Register';
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
                <div className="app-container">
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
                            <Route path='/revenus' element={<RevenuPage />} />
                            <Route path='/depenses' element={<DepensePage />} />
                        </Routes>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
export default App;
