import React, { useState } from 'react';

export interface RevenuPageProps {}

const RevenuPage: React.FunctionComponent<RevenuPageProps> = () => {
    const [revenuForm, setRevenuForm] = useState(false);

    const toggleForm = () => {
        setRevenuForm(!revenuForm);
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="Revenu py-5">
                        <h1>Vos Revenu</h1>
                        <button onClick={toggleForm} className="form-footer__btn">
                            Ajouter vos revenus
                        </button>
                    </div>
                    {revenuForm && (
                        <div className="revenu">
                            <div className="overlay">
                                <div className="revenuForm-content">
                                    <h2>Ajouter des revenus</h2>
                                    <form>
                                        <div className="revenuForm-items">
                                            <div className="revenuForm-item log">
                                                <label className="revenuForm-label">Mois</label>
                                                <select name="Month" id="month">
                                                    <option value="">Test</option>
                                                    <option value="">Test2</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="revenuForm-items">
                                            <div className="revenuForm-item">
                                                <label className="revenuForm-label">Montant</label>
                                                <input type="text" className="revenuForm-control" id="InputMontant" />
                                            </div>
                                        </div>
                                        <div className="revenuForm-items">
                                            <div className="revenuForm-item log">
                                                <label className="revenuForm-label">Catégorie</label>
                                                <select name="Month" id="month">
                                                    <option value="">Catégorie 1</option>
                                                    <option value="">Catégorie 2</option>
                                                </select>
                                            </div>
                                        </div>
                                    </form>
                                    <button className="close-revenuForm" onClick={toggleForm}>
                                        X
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default RevenuPage;
