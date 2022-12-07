import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

export interface LoginPageProps {}

const LoginPage: React.FunctionComponent<LoginPageProps> = () => {
    const { loginUser } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e : SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        email.length > 0 && loginUser(email, password);
    };

    return (
        <>
            <Header />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6">
                        <div className="Login auth py-5">
                            <div className="LoginBox auth-box py-5 px-5">
                                <div className="LoginContent auth-content">
                                    <div className="LoginHeader auth-header">
                                        <h1>Connexion</h1>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-items py-2">
                                            <div className="form-item log">
                                                <label className="form-label" htmlFor='email'>Email</label>
                                                <input type="email" className="form-control" id="email" name='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} required/>
                                            </div>
                                        </div>
                                        <div className="form-items py-2">
                                            <div className="form-item log">
                                                <label className="form-label" htmlFor='password'>Mot de passe</label>
                                                <input type="password" className="form-control" id="password" placeholder='Mot de passe' onChange={(e) => setPassword(e.target.value)} value={password} required/>
                                            </div>
                                        </div>
                                        <div className="form-footer">
                                            <div className="form-footer__text">
                                                <span>Vous n'avez pas de compte ?</span>
                                                <Link to="/register" className="register__link">
                                                    Inscription
                                                </Link>
                                            </div>
                                            <button className="form-footer__btn" type="submit">
                                                Connexion
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
