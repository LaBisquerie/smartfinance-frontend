import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

export interface RevenuPageProps {}

const RevenuPage: React.FunctionComponent<RevenuPageProps> = () => {
    const data = {
        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        datasets: [
            {
                label: 'Revenu Annuel',
                data: ['900', '984', '1013', '964', '780']
            }
        ]
    };

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
<<<<<<< HEAD
                <div className="row">
                    <div className="Chart">
                        <div className="card">
                            <Bar data={data} />
                        </div>
                    </div>
                </div>
=======
>>>>>>> fa216927c7f490b7888ee23474b8fb579a81ea43
            </div>
        </>
    );
};

export default RevenuPage;
