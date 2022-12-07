import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

interface RegisterPageProps {}

const RegisterPage: React.FunctionComponent<RegisterPageProps> = () => {
    const { registerUser } = useAuth();
    const [firstName, setFirstname] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleSubmit = (e : SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password === passwordConfirm) registerUser(email, password, passwordConfirm, firstName, lastname)
    }

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
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-items py-2">
                                            <div className="form-item">
                                                <label className="form-label">Prénom</label>
                                                <input type="text" className="form-control" id="firstname" name='firstname' onChange={(e) => setFirstname(e.target.value)} value={firstName} required/>
                                            </div>
                                            <div className="form-item">
                                                <label className="form-label">Nom</label>
                                                <input type="text" className="form-control" id="lastname" name='lastname' onChange={(e) => setLastName(e.target.value)} value={lastname} required/>
                                            </div>
                                        </div>
                                        <div className="form-items py-2">
                                            <div className="form-item form-item__mail">
                                                <label className="form-label">E-mail</label>
                                                <input type="email" className="form-control" id="email" name='email' onChange={(e) => setEmail(e.target.value)} value={email} required/>
                                            </div>
                                        </div>
                                        <div className="form-items py-2">
                                            <div className="form-item">
                                                <label className="form-label">Mot de passe</label>
                                                <input type="password" className="form-control" id="password" name='password' onChange={(e) => setPassword(e.target.value)} value={password} required/>
                                            </div>
                                            <div className="form-item">
                                                <label className="form-label">Confirmer le mot de passe</label>
                                                <input type="password" className="form-control" id="passwordConfirm" name='passwordConfirm' onChange={(e) => setPasswordConfirm(e.target.value)} value={passwordConfirm} required/>
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
