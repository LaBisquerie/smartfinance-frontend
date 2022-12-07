import React, { Fragment, SyntheticEvent, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {IoIosClose} from 'react-icons/io';
import { TiDelete, TiDeleteOutline, TiPlus } from 'react-icons/ti';
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import BarChart from '../components/BarChart';


export interface RevenuPageProps {}

export type Revenu = {
    "id": number;
    "categorie_name": string,
    "short_description": string,
    "montant": number,
    "type": "OUTCOME"|"INCOME",
    "date": string,
    "categorie": number,
    "utilisateur": string
};

const RevenuPage: React.FunctionComponent<RevenuPageProps> = () => {
    const [selectedRevenu, setSelectedRevenu] = useState<Revenu|undefined>();
    const [revenuForm, setRevenuForm] = useState(false);
    const [deleteRevenuForm, setDeleteRevenuForm] = useState(false);
    const [updateRevenuForm, setUpdateRevenuForm] = useState(false);
    const [revenus, setRevenus] = useState<Revenu[]|undefined>();
    const { user } = useAuth();
    const [descBudget, setDescBudget] = useState('');
    const [amount, setAmount] = useState(0);
    const [categories, setCategories] = useState<any[]|undefined>();
    const [selectedCategoryLabel, setSelectedCategoryLabel] = useState('');
    const [selectedCategoryValue, setSelectedCategoryValue] = useState(0);
    const today = format(new Date(), 'yyyy-MM-dd');
    let [selectedDate, setSelectedDate] = useState<Date|null>(null);

    const toggleForm = () => {
        if (!revenuForm) {
            setDescBudget('');
            setAmount(0);
            setSelectedDate(new Date());
            setSelectedCategoryValue(0);
        }
        setRevenuForm(!revenuForm);
    };

    const toggleUpdateForm = (revenu? : Revenu) => {
        if (revenu !== undefined && !updateRevenuForm) {
            setSelectedRevenu(revenu);
            setDescBudget(revenu.short_description);
            setAmount(revenu.montant);
            setSelectedDate(new Date(revenu.date));
        }
        setUpdateRevenuForm(!updateRevenuForm);
    }

    const toggleDeleteForm = (revenu? : Revenu) => {
        if (revenu !== undefined && !deleteRevenuForm) {
            setSelectedRevenu(revenu);
        }
        setDeleteRevenuForm(!deleteRevenuForm)
    }

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
        .then(res => setRevenus(res))
        .catch(err => console.log(err))
        fetch('http://localhost:8000/api/categories/')
        .then(response => response.json())
        .then(res => setCategories(res))
        .catch(err => console.log(err))
    }, [])

    const createRevenu = async (categorie_name : string, short_description : string, montant : number, date : string, categorie : number) => {
        const response = await fetch("http://localhost:8000/api/budgets/", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                categorie_name,
                short_description,
                montant,
                type: 'INCOME',
                date,
                categorie,
                utilisateur: user?.user_id
            })
        });

        const data = await response.json();
        console.log({data});
        if(response.status === 200 || response.status === 201) {
            toast.success('votre revenu à été créée avec succès !');
            fetch('http://localhost:8000/api/budgets/')
                .then(response => response.json())
                .then(res => setRevenus(res))
                .catch(err => console.log(err))
        } else {
            console.log("Something went wrong !");
        }
    }

    const updateRevenu = async (categorie_name : string, short_description : string, montant : number, date : string, categorie : number, revenuId : number) => {
        const response = await fetch(`http://localhost:8000/api/budgets/${revenuId}/`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                categorie_name,
                short_description,
                montant,
                type: 'INCOME',
                date,
                categorie,
                utilisateur: user?.user_id
            })
        });

        const data = await response.json();
        console.log({data});
        if (response.status === 200 || response.status === 201) {
            toast.success('Votre revenu à été modifiée avec succès !');
            fetch('http://localhost:8000/api/budgets/')
                .then(response => response.json())
                .then(res => setRevenus(res))
                .catch(err => console.log(err))
        } else {
            console.log('Something went wrong');
            
        }
    }

    const deleteRevenu = async (revenuId : number) => {
        const response = await fetch(`http://localhost:8000/api/budgets/${revenuId}/`, {
            method: 'DELETE'
        })

        if(response.status === 200 || response.status === 204) {
            toast.success('Votre revenu à bien été supprimée avec succès !');
            fetch('http://localhost:8000/api/budgets/')
                .then(response => response.json())
                .then(res => setRevenus(res))
                .catch(err => console.log(err))
        } else {
            console.log('Something went wrong')
        }
    }

    const handleSubmit = (e : SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        createRevenu(selectedCategoryLabel, descBudget, amount, format(selectedDate!, 'yyyy-MM-dd'), selectedCategoryValue);
        setRevenuForm(!revenuForm);
    }

    const handleUpdateSubmit = (e:SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedRevenu) {
            updateRevenu(selectedCategoryLabel, descBudget, amount, format(selectedDate!, 'yyyy-MM-dd'), selectedCategoryValue, selectedRevenu.id);
        }
        setUpdateRevenuForm(!updateRevenuForm);
    }

    const handleDeleteSubmit = (e:SyntheticEvent<HTMLFormElement>) =>  {
        e.preventDefault();
        if (selectedRevenu) {
            deleteRevenu(selectedRevenu.id);
        }
        setDeleteRevenuForm(!deleteRevenuForm);
    }

    return (
        <>
            <div className="revenu">
                <ToastContainer/>
                <div className="revenu-header">
                    <h1 className="revenu-header__title">Vos revenus</h1>
                    <button onClick={toggleForm} className="btn btn-primary revenu-header__btn d-none d-lg-block">
                        Ajouter vos revenus
                    </button>
                    <button onClick={toggleForm} className="btn btn-primary revenu-header__btn revenu-header__btn-sm d-lg-none">
                        <TiPlus className='revenu-header__btn-icon' />
                    </button>
                </div>
                {revenuForm && (
                    <div className="revenu">
                        <div className="overlay">
                            <div className="revenu-content">
                                <div className="revenu-form__header">
                                    <h2 className="revenu-form__title">Ajouter des revenus</h2>
                                    <button className="revenu-form__btn-close" onClick={toggleForm}>
                                        <IoIosClose className='revenu-form__btn-icon' />
                                    </button>
                                </div>
                                <form className="revenu-form" onSubmit={handleSubmit}>
                                    <div className="revenu-form-item">
                                        <label className="revenu-form-item__label">Nom du revenu</label>
                                        <input type="text" className="revenu-form-item__input" id="descBudget" name="descBudget" onChange={(e) => setDescBudget(e.target.value)} value={descBudget} />
                                    </div>
                                    <div className="revenu-form-item">
                                        <label className="revenu-form__label">Montant</label>
                                        <input type="number" className="revenu-form-item__input" id="amount" name="amount" onChange={(e) => setAmount(+e.target.value)} value={amount} />
                                    </div>
                                    <div className="revenu-form-item">
                                        <label className="revenu-form-item__label">Date</label>
                                        <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} dateFormat="yyyy-MM-dd" placeholderText={today}/>
                                    </div>
                                    <div className="revenu-form-item">
                                        <label className="revenu-form-item__label">Catégorie</label>
                                        <select className='revenu-form-item__input revenu-form-item__input--select' name="selectedCategory" id="selectedCategory" onChange={handleChange} value={selectedCategoryValue}>
                                            <option value="null">--Choisir une catégorie--</option>
                                            {categories?.map((categorie : any) => { 
                                                return (
                                                    <option key={categorie.id} value={categorie.id}>{categorie.nom}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                <button type='submit'className='btn btn-primary revenu-form__btn'>Ajouter</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
                <div className="revenu-list">
                    <div className="table-responsive-sm">
                        <table className="revenu-table">
                            <tr>
                                <th className='revenu-table__header'>Opération</th>
                                <th className='revenu-table__header'>Date</th>
                                <th className='revenu-table__header'>Montant</th>
                                <th className='revenu-table__header'>Actions</th>
                            </tr>
                            {revenus?.map((revenu) => {
                                if (user?.user_id === revenu.utilisateur && revenu.type === 'INCOME') {
                                    return (
                                        <Fragment key={revenu.id}>
                                            <tr className='revenu-table__item'>
                                                <td className='revenu-table__item revenu-table__item--title'>{revenu.short_description}</td>
                                                <td className='revenu-table__item revenu-table__item--date'>{revenu.date}</td>
                                                <td className='revenu-table__item revenu-table__item--amount'>{revenu.montant} €</td>
                                                <td className='revenu-table__item revenu-table__item--actions'>
                                                    <HiOutlinePencilAlt className='revenu-table__item--update' onClick={() => toggleUpdateForm(revenu)}/>
                                                    <TiDelete className='revenu-table__item--delete' onClick={() => toggleDeleteForm(revenu)} />
                                                </td>
                                            </tr>
                                        </Fragment>
                                    )
                                }
                            })}
                        </table>
                    </div>
                    {updateRevenuForm && (
                        <div className="revenu">
                            <div className="overlay">
                                <div className="revenu-content">
                                    <div className="revenu-form__header">
                                        <h2 className='revenu-form__title'>Modifer votre revenu</h2>
                                        <button className="revenu-form__btn-close" onClick={() => toggleUpdateForm()}>
                                            <IoIosClose className='revenu-form__btn-icon' />
                                        </button>
                                    </div>
                                    <form className='revenu-form' onSubmit={handleUpdateSubmit}>
                                        <div className="revenu-form-item">
                                            <label className="revenu-form-item__label">Nom de la revenu</label>
                                            <input type="text" className="revenu-form-item__input" id="descBudget" name='descBudget' onChange={(e) => setDescBudget(e.target.value)} value={descBudget} />
                                        </div>
                                        <div className="revenu-form-item">
                                            <label className="revenu-form-item__label">Montant</label>
                                            <input type="number" className="revenu-form-item__input" id="amount" name='amount' onChange={(e) => setAmount(+e.target.value)} value={amount} />
                                        </div>
                                        <div className="revenu-form-item">
                                            <label className="revenu-form-item__label">Date</label>
                                            <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} dateFormat="yyyy-MM-dd" placeholderText={today}/>
                                        </div>
                                        <div className="revenu-form-item">
                                            <label className="revenu-form-item__label">Catégorie</label>
                                            <select className='revenu-form-item__input revenu-form-item__input--select' name="selectedCategory" id="selectedCategory" onChange={handleChange} value={selectedCategoryValue}>
                                                <option value="null">--Choisir une catégorie--</option>
                                                {categories?.map((categorie : any) => { 
                                                    return (
                                                        <option key={categorie.id} value={categorie.id}>{categorie.nom}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <button type='submit'className='btn btn-primary revenu-form__btn'>Modifier</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                    {deleteRevenuForm && (
                        <div className="revenu revenu-modal-delete">
                            <div className="overlay">
                                <form className="revenu-content" onSubmit={handleDeleteSubmit}>
                                    <div className="revenu-delete-modal__header">
                                        <TiDeleteOutline className='revenu-delete-modal__icon' />
                                        <h2 className='revenu-delete-modal__title'>Êtes-vous sûr de supprimer ?</h2>
                                        <button className="revenu-form__btn-close" onClick={() => toggleDeleteForm()}>
                                            <IoIosClose className='revenu-form__btn-icon' />
                                        </button>
                                    </div>
                                    <div className="revenu-delete-modal__body">
                                        <p>Si vous supprimer cette dépense vous n'aurez pas la possiblité de la récupérer.</p>
                                    </div>
                                    <div className="revenu-delete__footer">
                                        <button className='btn revenu-delete-modal__btn' onClick={() => toggleDeleteForm()}>Annuler</button>
                                        <button type='submit' className='btn btn-danger revenu-delete-modal__btn'>Supprimer</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default RevenuPage;


