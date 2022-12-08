import React, { Fragment, SyntheticEvent, useEffect, useState } from 'react';
import { useAuth } from "../context/AuthContext";

export interface IHomePageProps { }

const HomePage: React.FunctionComponent<IHomePageProps> = () => {

    const { user } = useAuth();
    const [userScore, setUserScore] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);


    const getUserScore = () => {
        fetch(`http://localhost:8000/api/users/${user?.user_id}/`)
            .then((response) => response.json())
            .then((res) => setUserScore(res.total_amount))
            .catch((err) => console.log(err));
    };

    const calculRevenus = (revenus:any) => {
        let totalRevenus = 0;
        revenus.forEach((revenu: any)=> {
            totalRevenus += revenu.montant
        })
        setTotalIncome(totalRevenus);
    }

    const calculIncome = (depenses:any) => {
        let totalDepenses = 0;
        depenses.forEach((depense: any)=> {
            totalDepenses += depense.montant
        })
        setTotalExpense(totalDepenses);
    }

    const getRevenus = () => {
        fetch('http://localhost:8000/api/budgets/?categorie=&categorie__type=INCOME&date_after=&date_before=')
        .then((response) => response.json())
        .then((res) => calculRevenus(res))
        .catch((err) => console.log(err));
    }

    const getDepenses = () => {
        fetch('http://localhost:8000/api/budgets/?categorie=&categorie__type=OUTCOME&date_after=&date_before=')
        .then((response) => response.json())
        .then((res) => calculIncome(res))
        .catch((err) => console.log(err));
    }

    useEffect(() => {
        getUserScore();
        getRevenus();
        getDepenses();
    }, []);


    return (
        <div className='home-main-container'>
            <div className="cards-container text-center">
                <div className="card">
                    <div className="card-body">
                        <blockquote className="blockquote mb-0 ">
                            <p>Solde</p>
                            <footer className="mt-3">{userScore || 0 }€</footer>
                        </blockquote>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <blockquote className="blockquote mb-0">
                            <p>Revenus</p>
                            <footer className="mt-3">{totalIncome}€</footer>
                        </blockquote>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <blockquote className="blockquote mb-0">
                            <p>Dépenses</p>
                            <footer className="mt-3">{totalExpense}€</footer>
                        </blockquote>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default HomePage;
