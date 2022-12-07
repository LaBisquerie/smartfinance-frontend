import React from 'react';

export interface IHomePageProps { }

const HomePage: React.FunctionComponent<IHomePageProps> = () => {
    return (
        <div className='home-main-container'>
            <div className="cards-container">
                <div className="card">
                    <div className="card-body">
                        <blockquote className="blockquote mb-0">
                            <p>A well-known quote, contained in a blockquote element.</p>
                            <footer className="blockquote-footer mt-3">Someone famous in <cite title="Source Title">Source Title</cite></footer>
                        </blockquote>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <blockquote className="blockquote mb-0">
                            <p>A well-known quote, contained in a blockquote element.</p>
                            <footer className="blockquote-footer mt-3">Someone famous in <cite title="Source Title">Source Title</cite></footer>
                        </blockquote>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <blockquote className="blockquote mb-0">
                            <p>A well-known quote, contained in a blockquote element.</p>
                            <footer className="blockquote-footer mt-3">Someone famous in <cite title="Source Title">Source Title</cite></footer>
                        </blockquote>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default HomePage;
