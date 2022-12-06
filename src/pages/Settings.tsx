import React from 'react';
import { Link } from 'react-router-dom';

export interface ISettingsPageProps { }

const SettingsPage: React.FunctionComponent<ISettingsPageProps> = () => {
    return (
        <>
            <div className="settings-main-container">

                <div className="card text-center profile-card">
                    <div className="card-header">
                        Profile
                    </div>
                    <div className="card-body">
                        <table className="table">

                            <tbody >
                                <tr>
                                    <td>Nom</td>
                                    <td>Chamass</td>
                                </tr>
                                <tr>
                                    <td>Prénom</td>
                                    <td>Ali</td>
                                </tr>
                                <tr>

                                    <td>Email</td>
                                    <td>ali.chamass@ynov.com</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer text-muted">
                        2 days ago
                    </div>
                </div>

            </div>


        </>
    );
};

export default SettingsPage;
