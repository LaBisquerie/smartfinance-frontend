import React, { SyntheticEvent, useEffect, useState } from 'react';
import { format } from 'date-fns'
import { useAuth } from '../context/AuthContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {IoIosClose} from 'react-icons/io';

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
    const today = format(new Date(), 'yyyy-mm-dd');
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

    const createBudget = async (categorie_name : string, short_description : string, montant : number, date : string, categorie : number) => {
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
        } else {
            console.log("Something went wrong !");
        }
    }

    const handleSubmit = (e : SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        createBudget(selectedCategoryLabel, descBudget, amount, format(selectedDate, 'yyyy-MM-dd'), selectedCategoryValue);
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
            {depenses?.map((depense :any) => {
                if (user?.user_id === depense.utilisateur && depense.type === 'OUTCOME') {
                    return (
                        <>
                            <p>desc : {depense.short_description}</p>
                            <p>date : {depense.date}</p>
                            <p>montant{depense.montant}</p>
                            <p>catégorie: {depense.categorie_name}</p>
                        </>
                    )
                }
                })}
            </div>
        </>
    );
};

export default DepensePage;
