import React, { Fragment, useEffect, useState } from 'react';
import DepensesBarChart from '../components/DepensesBarChart';
import GlobalDonutChart from '../components/GlobalDonutsChart';
import { useAuth } from '../context/AuthContext';
import { Depense } from './Depenses';
import { Revenu } from './Revenus';

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = () => {
    const [revenus, setRevenus] = useState<Revenu[] | undefined>();
    const [depenses, setDepenses] = useState<Depense[] | undefined>();
    const { user } = useAuth();
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    const calculRevenus = (revenus: any) => {
        let totalRevenus = 0;
        revenus.forEach((revenu: any) => {
            totalRevenus += revenu.montant;
        });
        setTotalIncome(totalRevenus);
    };

    const calculDepenses = (depenses: any) => {
        let totalDepenses = 0;
        depenses.forEach((depense: any) => {
            totalDepenses += depense.montant;
        });
        setTotalExpense(totalDepenses);
    };

    const calculTotalAmount = (revenus: any, depenses: any) => {
        let totalAmount = 0;

        totalAmount = revenus - depenses;
        setTotalAmount(totalAmount);
    };

    const getRevenus = () => {
        fetch('http://localhost:8000/api/budgets/?categorie=&categorie__type=INCOME&date_after=&date_before=')
            .then((response) => response.json())
            .then((res) => calculRevenus(res))
            .catch((err) => console.log(err));
    };

    const getDepenses = () => {
        fetch('http://localhost:8000/api/budgets/?categorie=&categorie__type=OUTCOME&date_after=&date_before=')
            .then((response) => response.json())
            .then((res) => {
                calculDepenses(res);
                setDepenses(res);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getRevenus();
        getDepenses();
    }, []);

    useEffect(() => {
        calculTotalAmount(totalIncome, totalExpense);
    }, [totalExpense, totalIncome]);

    return (
        <div className="home-main-container">
            <div className="cards-container text-center">
                <div className="card">
                    <div className="card-body">
                        <blockquote className="blockquote mb-0 ">
                            <p>Solde</p>
                            <footer className="mt-3">{totalAmount}€</footer>
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
            <div>
                <GlobalDonutChart depenses={depenses ?? []} />
            </div>
            <div className="table-responsive-sm">
                <table className="revenu-table">
                    <thead>
                        <tr>
                            <th className="revenu-table__header">Opération</th>
                            <th className="revenu-table__header">Date</th>
                            <th className="revenu-table__header">Montant</th>
                        </tr>
                    </thead>
                    <tbody>
                        {depenses?.map((depense) => {
                            if (user?.user_id === depense.utilisateur && depense.type === 'OUTCOME') {
                                return (
                                    <Fragment key={depense.id}>
                                        <tr className="revenu-table__item">
                                            <td className="revenu-table__item revenu-table__item--title">{depense.short_description}</td>
                                            <td className="revenu-table__item revenu-table__item--date">{depense.date}</td>
                                            <td className="revenu-table__item revenu-table__item--amount">{depense.montant} €</td>
                                        </tr>
                                    </Fragment>
                                );
                            }
                            return null;
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HomePage;
