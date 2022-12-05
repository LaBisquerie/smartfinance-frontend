import React, { SyntheticEvent, useEffect, useState } from 'react';
import { format } from 'date-fns'
import { useAuth } from '../context/AuthContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {IoIosClose} from 'react-icons/io';
import { TiDelete } from 'react-icons/ti';
import { HiOutlinePencilAlt } from 'react-icons/hi'

export interface DepensePageProps {}

const DepensePage: React.FunctionComponent<DepensePageProps> = () => {
    const [depenseForm, setDepenseForm] : any = useState('');
    const [depenses, setDepenses] : any = useState();
    const { user } = useAuth();
    const [descBudget, setDescBudget] : any = useState('');
    const [amount, setAmount] : any = useState(0);
    const [categories, setCategories] : any = useState();
    const [selectedCategoryLabel, setSelectedCategoryLabel] : any = useState();
    const [selectedCategoryValue, setSelectedCategoryValue] : any = useState();
    const today = format(new Date(), 'yyyy-MM-dd');
    let [selectedDate, setSelectedDate] : any = useState(null);
    const toggleForm = () => {
        setDepenseForm(!depenseForm);
    };

    const handleChange = (e : any) => {
        let index = e.nativeEvent.target.selectedIndex;
        let label = e.nativeEvent.target[index].text;
        let value = e.target.value;
        setSelectedCategoryValue(value);
        setSelectedCategoryLabel(label);
    }    

    useEffect(() => {
        fetch('http://localhost:8000/api/budgets/')
        .then(response => response.json())
        .then(res => setDepenses(res))
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        fetch('http://localhost:8000/api/categories/')
        .then(response => response.json())
        .then(res => setCategories(res))
        .catch(err => console.log(err))
    }, [])

    const createDepense = async (categorie_name : string, short_description : string, montant : number, date : string, categorie : number) => {
        const response = await fetch("http://localhost:8000/api/budgets/", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                categorie_name,
                short_description,
                montant,
                type: 'OUTCOME',
                date,
                categorie,
                utilisateur: user?.user_id
            })
        });

        const data = await response.json();
        console.log({data});
        if(response.status === 200 || response.status === 201) {
            console.log('work');
            fetch('http://localhost:8000/api/budgets/')
                .then(response => response.json())
                .then(res => setDepenses(res))
                .catch(err => console.log(err))
        } else {
            console.log("Something went wrong !");
        }
    }

    // const updateDepense = async (categorie_name : string, short_description : string, montant : number, date : string, categorie : number) => {
    //     const response = await fetch(`http://localhost:8000/api/budgets/${revenuId}/`, {
    //         method: 'PUT',
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //             categorie_name,
    //             short_description,
    //             montant,
    //             type: 'OUTCOME',
    //             date,
    //             categorie,
    //             utilisateur: user?.user_id
    //         })
    //     });

    //     const data = await response.json();
    //     console.log(data);
    // }

    const deleteDepense = async (revenuId : number) => {
        const response = await fetch(`http://localhost:8000/api/budgets/${revenuId}/`, {
            method: 'DELETE'
        })

        fetch('http://localhost:8000/api/budgets/')
            .then(response => response.json())
            .then(res => setDepenses(res))
            .catch(err => console.log(err))
    }

    const handleSubmit = (e : SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        createDepense(selectedCategoryLabel, descBudget, amount, format(selectedDate, 'yyyy-MM-dd'), selectedCategoryValue);
        setDepenseForm(!depenseForm);
    }

    return (
        <>
            <div className="depense">
                <div className="depense-header">
                    <h1 className='depense-header__title'>Vos dépenses</h1>
                    <button onClick={toggleForm} className="btn btn-primary depense-header__btn">
                        Ajouter vos dépenses
                    </button>
                </div>
                {depenseForm && (
                    <div className="depense">
                        <div className="overlay">
                            <div className="depense-content">
                                <div className="depense-form__header">
                                    <h2 className='depense-form__title'>Ajouter vos dépenses</h2>
                                    <button className="depense-form__btn-close" onClick={toggleForm}>
                                        <IoIosClose className='depense-form__btn-icon' />
                                    </button>
                                </div>
                                <form className='depense-form' onSubmit={handleSubmit}>
                                    <div className="depense-form-item">
                                        <label className="depense-form-item__label">Nom de la dépense</label>
                                        <input type="text" className="depense-form-item__input" id="descBudget" name='descBudget' onChange={(e) => setDescBudget(e.target.value)} value={descBudget} />
                                    </div>
                                    <div className="depense-form-item">
                                        <label className="depense-form-item__label">Montant</label>
                                        <input type="number" className="depense-form-item__input" id="amount" name='amount' onChange={(e) => setAmount(e.target.value)} value={amount} />
                                    </div>
                                    <div className="depense-form-item">
                                        <label className="depense-form-item__label">Date</label>
                                        <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} dateFormat="yyyy-MM-dd" placeholderText={today}/>
                                    </div>
                                    <div className="depense-form-item">
                                        <label className="depense-form-item__label">Catégorie</label>
                                        <select className='depense-form-item__input depense-form-item__input--select' name="selectedCategory" id="selectedCategory" onChange={handleChange} value={selectedCategoryValue}>
                                            <option value="null">--Choisir une catégorie--</option>
                                            {categories?.map((categorie : any) => { 
                                                return (
                                                    <option key={categorie.id} value={categorie.id}>{categorie.nom}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <button type='submit'className='btn btn-primary depense-form__btn'>Ajouter</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
                <div className="depense-list">
                    <table className="depense-table">
                        <tr>
                            <th className='depense-table__header'>Opération</th>
                            <th className='depense-table__header'>Date</th>
                            <th className='depense-table__header'>Montant</th>
                            <th className='depense-table__header'>Actions</th>
                        </tr>
                        {depenses?.map((depense :any) => {
                            if (user?.user_id === depense.utilisateur && depense.type === 'OUTCOME') {
                                return (
                                    <>
                                        <tr className='depense-table__item'>
                                            <td className='depense-table__item depense-table__item--title'>{depense.short_description}</td>
                                            <td className='depense-table__item depense-table__item--date'>{depense.date}</td>
                                            <td className='depense-table__item depense-table__item--amount'>{depense.montant} €</td>
                                            <td className='depense-table__item depense-table__item--actions'>
                                                <HiOutlinePencilAlt className='depense-table__item--update'/>
                                                {/* Ajouter une popup de verification afin de valider la verification */}
                                                <TiDelete className='depense-table__item--delete' onClick={() => deleteDepense(depense.id)} />
                                            </td>
                                        </tr>
                                    </>
                                )
                            }
                        })}
                    </table>
                </div>
            </div>
        </>
    );
};

export default DepensePage;
