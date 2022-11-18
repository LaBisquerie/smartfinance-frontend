import React from 'react';
import { Link } from 'react-router-dom';

interface RegisterPageProps {}

const RegisterPage: React.FunctionComponent<RegisterPageProps> = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="Register">
                    <div className="RegisterBox">
                        <div className="RegisterHeader">
                            <h1>Register</h1>
                        </div>
                        <form>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="form-label">Prénom</label>
                                    <input type="firstName" className="form-control" id="inputFirstName" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Nom</label>
                                    <input type="lastName" className="form-control" id="inputLastName" />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <label className="form-label">E-mail</label>
                                <input type="email" className="form-control" id="inputName" />
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="form-label">Mot de passe</label>
                                    <input type="password" className="form-control" id="inputPassword" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Confirmer le mot de passe</label>
                                    <input type="password" className="form-control" id="inputPasswordConfirm" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <li>
                                    Vous avez déjà un compte ?{' '}
                                    <Link to="/login" className="active">
                                        Connexion
                                    </Link>
                                </li>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
