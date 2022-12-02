import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export interface LoginPageProps {}

const LoginPage: React.FunctionComponent<LoginPageProps> = () => {
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
                                    <form>
                                        <div className="form-items py-2">
                                            <div className="form-item log">
                                                <label className="form-label">Email</label>
                                                <input type="email" className="form-control" id="InputEmail" />
                                            </div>
                                        </div>
                                        <div className="form-items py-2">
                                            <div className="form-item log">
                                                <label className="form-label">Mot de passe</label>
                                                <input type="password" className="form-control" id="InputPassword" />
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
