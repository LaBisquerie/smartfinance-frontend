import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

interface RegisterPageProps {}

const RegisterPage: React.FunctionComponent<RegisterPageProps> = () => {
    return (
        <>
            <Header />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-7">
                        <div className="Register auth py-5">
                            <div className="RegisterBox auth-box py-5 px-5">
                                <div className="RegisterContent auth-content">
                                    <div className="RegisterHeader auth-header">
                                        <h1>Inscription</h1>
                                    </div>
                                    <form>
                                        <div className="form-items py-2">
                                            <div className="form-item">
                                                <label className="form-label">Prénom</label>
                                                <input type="firstName" className="form-control" id="inputFirstName" />
                                            </div>
                                            <div className="form-item">
                                                <label className="form-label">Nom</label>
                                                <input type="lastName" className="form-control" id="inputLastName" />
                                            </div>
                                        </div>
                                        <div className="form-items py-2">
                                            <div className="form-item form-item__mail">
                                                <label className="form-label">E-mail</label>
                                                <input type="email" className="form-control" id="inputName" />
                                            </div>
                                        </div>
                                        <div className="form-items py-2">
                                            <div className="form-item">
                                                <label className="form-label">Mot de passe</label>
                                                <input type="password" className="form-control" id="inputPassword" />
                                            </div>
                                            <div className="form-item">
                                                <label className="form-label">Confirmer le mot de passe</label>
                                                <input type="password" className="form-control" id="inputPasswordConfirm" />
                                            </div>
                                        </div>
                                        <div className="form-footer">
                                            <div className="form-footer__text">
                                                <span>Vous avez déjà un compte ?</span>
                                                <Link to="/login" className="register__link">
                                                    Connexion
                                                </Link>
                                            </div>
                                            <button className="form-footer__btn" type="submit">
                                                Inscription
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

export default RegisterPage;
