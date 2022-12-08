import React from 'react';

export interface IHomePageProps { }

const HomePage: React.FunctionComponent<IHomePageProps> = () => {
    return (
        <div className='home-main-container'>
            <div className="cards-container text-center">
                <div className="card">
                    <div className="card-body">
                        <blockquote className="blockquote mb-0 ">
                            <p>Solde</p>
                            <footer className="mt-3">2800€</footer>
                        </blockquote>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <blockquote className="blockquote mb-0">
                            <p>Revenus</p>
                            <footer className="mt-3">500€</footer>
                        </blockquote>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <blockquote className="blockquote mb-0">
                            <p>Économies</p>
                            <footer className="mt-3">700€</footer>
                        </blockquote>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default HomePage;
