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
import DepensesBarChart from '../components/DepensesBarChart';

export interface DepensePageProps {}

export type Depense = {
    "id": number;
    "categorie_name": string,
    "short_description": string,
    "montant": number,
    "type": "OUTCOME"|"INCOME",
    "date": string,
    "categorie": number,
    "utilisateur": string
}

const monthRequest: Record<string, { date_after: string; date_before: string }> = {
    janvier: { date_after: "2022-01-01", date_before: "2022-01-31" },
    fevrier: { date_after: "2022-02-01", date_before: "2022-02-28" },
    mars: { date_after: "2022-03-01", date_before: "2022-03-31" },
    avril: { date_after: "2022-04-01", date_before: "2022-04-30" },
    mai: { date_after: "2022-05-01", date_before: "2022-05-31" },
    juin: { date_after: "2022-06-01", date_before: "2022-06-30" },
    juillet: { date_after: "2022-07-01", date_before: "2022-07-31" },
    aout: { date_after: "2022-08-01", date_before: "2022-08-31" },
    septembre: { date_after: "2022-09-01", date_before: "2022-09-30" },
    octobre: { date_after: "2022-10-01", date_before: "2022-10-31" },
    novembre: { date_after: "2022-11-01", date_before: "2022-11-30" },
    decembre: { date_after: "2022-12-01", date_before: "2022-12-31" },
    allMonth: { date_after: "2022-01-01", date_before: "2022-12-31" }
};

type Category = {
    nom: string;
    id: number;
}

const DepensesPage: React.FunctionComponent<DepensePageProps> = () => {
    const [selectedDepense, setSelectedDepense] = useState<Depense|undefined>();
    const [depenseForm, setDepenseForm] = useState(false);
        const [categoryForm, setCategoryForm] = useState(false);
    const [deleteDepenseForm, setDeleteDepenseForm] = useState(false);
    const [updateDepenseForm, setUpdateDepenseForm] = useState(false);
    const [depenses, setDepenses] = useState<Depense[]|undefined>();
    const { user } = useAuth();
    const [descBudget, setDescBudget] = useState('');
    const [amount, setAmount] = useState(0);
    const [categories, setCategories] = useState<Category[]|undefined>();
    const [selectedCategoryLabel, setSelectedCategoryLabel] = useState('');
    const [selectedCategoryValue, setSelectedCategoryValue] = useState('');
    const today = format(new Date(), 'yyyy-MM-dd');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedMonthValue, setSelectedMonthValue] = useState("allMonth");
    const [selectedFilterCategory, setSelectedFilterCategory] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [categoryDesc, setCategoryDesc] = useState('');

    const toggleForm = () => {
        if (!depenseForm) {
            setDescBudget('');
            setAmount(0);
            setSelectedDate(new Date());
            setSelectedCategoryValue("");
        }
        setDepenseForm(!depenseForm);
    };

    const toggleCategoryForm = () => {
        if (!categoryForm) {
            setCategoryName('');
            setCategoryDesc('');
        }
        setCategoryForm(!categoryForm);
    }

    const toggleUpdateForm = (depense? : Depense) => {
        if (depense !== undefined && !updateDepenseForm) {
            setSelectedDepense(depense);
            setDescBudget(depense.short_description);
            setAmount(depense.montant);
            setSelectedDate(new Date(depense.date));
        }
        setUpdateDepenseForm(!updateDepenseForm);
    }

    const toggleDeleteForm = (depense? : Depense) => {
        if (depense !== undefined && !deleteDepenseForm) {
            setSelectedDepense(depense);
        }
        setDeleteDepenseForm(!deleteDepenseForm)
    }

    const handleChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
        let value = e.target.value;
        setSelectedCategoryValue(value);
    }

    useEffect(() => {
        const currentMonth = monthRequest[selectedMonthValue]!;
        fetch(`http://localhost:8000/api/budgets/?categorie=${selectedFilterCategory}&categorie__type=OUTCOME&date_after=${currentMonth.date_after}&date_before=${currentMonth.date_before}`)
            .then((response) => response.json())
            .then((res) => setDepenses(res))
            .catch((err) => console.log(err));
    }, [selectedFilterCategory, selectedMonthValue])

    const handleCategorySubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    useEffect(() => {
        fetch('http://localhost:8000/api/budgets/?categorie=&categorie__type=OUTCOME')
            .then(response => response.json())
            .then(res => setDepenses(res))
            .catch(err => console.log(err))
        fetch('http://localhost:8000/api/categories/?type=OUTCOME')
            .then(response => response.json())
            .then(res => setCategories(res))
            .catch(err => console.log(err))
    }, [])

    const createRevenuCategory = async (nom : string, description: string) => {
        const response = await fetch('http://localhost:8000/api/categories/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nom,
                description,
                type: 'OUTCOME',
                parent_categorie: null,
                budgets: []
            })
        });

        const data = await response.json();
        console.log({ data });
        if (response.status === 200 || response.status === 201) {
            toast.success('votre catégorie à été créée avec succès !');
            fetch('http://localhost:8000/api/budgets/?categorie=&categorie__type=OUTCOME')
                .then((response) => response.json())
                .then((res) => setDepenses(res))
                .catch((err) => console.log(err));
            fetch('http://localhost:8000/api/categories/?type=OUTCOME')
                .then((response) => response.json())
                .then((res) => setCategories(res as Category[]))
                .catch((err) => console.log(err));
        } else {
            console.log('Something went wrong !');
        }
    }

    const createDepense = async (categorie_name : string, short_description : string, montant : number, date : string, categorie : number) => {
        const response = await fetch("http://localhost:8000/api/budgets/", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                categorie_name : categories?.find(category => category.id === categorie)?.nom ?? "",
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
            toast.success('votre dépense à été créée avec succès !');
            fetch('http://localhost:8000/api/budgets/?categorie=&categorie__type=OUTCOME')
                .then(response => response.json())
                .then(res => setDepenses(res))
                .catch(err => console.log(err))
        } else {
            console.log("Something went wrong !");
        }
    }

    const updateDepense = async (categorie_name : string, short_description : string, montant : number, date : string, categorie : number, depenseId : number) => {
        const response = await fetch(`http://localhost:8000/api/budgets/${depenseId}/`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                categorie_name: categories?.find(category => category.id === categorie)?.nom ?? "",
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
        if (response.status === 200 || response.status === 201) {
            toast.success('Votre dépense à été modifiée avec succès !');
            fetch('http://localhost:8000/api/budgets/?categorie=&categorie__type=OUTCOME')
                .then(response => response.json())
                .then(res => setDepenses(res))
                .catch(err => console.log(err))
        } else {
            console.log('Something went wrong');
        }
    }

    const deleteDepense = async (depenseId : number) => {
        const response = await fetch(`http://localhost:8000/api/budgets/${depenseId}/`, {
            method: 'DELETE'
        })

        if(response.status === 200 || response.status === 204) {
            toast.success('Votre dépense à bien été supprimée avec succès !');
            fetch('http://localhost:8000/api/budgets/?categorie=&categorie__type=OUTCOME')
                .then(response => response.json())
                .then(res => setDepenses(res))
                .catch(err => console.log(err))
        } else {
            console.log('Something went wrong')
        }
    }

    const handleSubmit = (e : SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        createDepense('', descBudget, amount, format(selectedDate!, 'yyyy-MM-dd'), parseInt(selectedCategoryValue));
        setDepenseForm(!depenseForm);
    }

    const handleAddCategorySubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        createRevenuCategory(categoryName, categoryDesc);
        setCategoryForm(!categoryForm);
    }

    const handleUpdateSubmit = (e:SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedDepense) {
            updateDepense('', descBudget, amount, format(selectedDate!, 'yyyy-MM-dd'), parseInt(selectedCategoryValue), selectedDepense.id);
        }
        setUpdateDepenseForm(!updateDepenseForm);
    }

    const handleDeleteSubmit = (e:SyntheticEvent<HTMLFormElement>) =>  {
        e.preventDefault();
        if (selectedDepense) {
            deleteDepense(selectedDepense.id);
        }
        setDeleteDepenseForm(!deleteDepenseForm);
    }

    return (
        <>
            <div className="depense">
                <ToastContainer />
                <div className="depense-header">
                    <h1 className='depense-header__title'>Vos dépenses</h1>
                    <button onClick={toggleForm} className="btn btn-primary depense-header__btn depense-header__btn--first">
                        Ajouter vos dépenses
                    </button>
                    <button onClick={toggleCategoryForm} className="btn btn-primary revenu-header__btn">
                        Ajouter une catégorie
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
                                        <input type="number" className="depense-form-item__input" id="amount" name='amount' onChange={(e) => setAmount(+e.target.value)} value={amount} />
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
                {categoryForm && (
                    <div className="revenu">
                        <div className="overlay">
                            <div className="revenu-content">
                                <div className="revenu-form__header">
                                    <h2 className="revenu-form__title">Ajouter une catégorie</h2>
                                    <button className="revenu-form__btn-close" onClick={toggleCategoryForm}>
                                        <IoIosClose className="revenu-form__btn-icon" />
                                    </button>
                                </div>
                                <form className="revenu-form" onSubmit={handleAddCategorySubmit}>
                                    <div className="revenu-form-item">
                                        <label className="revenu-form-item__label">Nom de la catégorie</label>
                                        <input type="text" className="revenu-form-item__input" id="categoryName" name="categoryName" onChange={(e) => setCategoryName(e.target.value)} value={categoryName} />
                                    </div>
                                    <div className="revenu-form-item">
                                        <label className="revenu-form__label">Description de la catégorie</label>
                                        <input type="text" className="revenu-form-item__input" id="categoryDesc" name="categoryDesc" onChange={(e) => setCategoryDesc(e.target.value)} value={categoryDesc} />
                                    </div>
                                    <button type="submit" className="btn btn-primary revenu-form__btn">
                                        Ajouter
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
                <div className="depense-chart">
                    <DepensesBarChart depenses={depenses ?? []} />
                </div>
                <div className="depense-list">
                    <div className="revenu-list__filters">
                        <form onSubmit={handleSubmit}>
                            <select className="depense-form-item__input depense-form-item__input--select" onChange={(e) => setSelectedMonthValue(e.target.value)} value={selectedMonthValue}>
                                <option value="allMonth">Tous les mois</option>
                                <option value="1">Janvier</option>
                                <option value="2">Février</option>
                                <option value="3">Mars</option>
                                <option value="4">Avril</option>
                                <option value="5">Mai</option>
                                <option value="6">Juin</option>
                                <option value="7">Juillet</option>
                                <option value="8">Août</option>
                                <option value="9">Septembre</option>
                                <option value="10">Octobre</option>
                                <option value="11">Novembre</option>
                                <option value="12">Décembre</option>
                            </select>
                        </form>
                        <form onSubmit={handleCategorySubmit}>
                            <select
                                className='depense-form-item__input depense-form-item__input--select'
                                name="selectedCategory"
                                id="selectedCategory"
                                onChange={(e) => setSelectedFilterCategory(e.target.value)} value={selectedFilterCategory}>
                            <option value="">--Choisir une catégorie--</option>
                            {categories?.map((categorie : any) => {
                                return (
                                    <option key={categorie.id} value={String(categorie.id)}>{categorie.nom}</option>
                                )
                            })}
                        </select>
                        </form>
                    </div>
                    <div className="table-responsive-sm">
                        <table className="depense-table">
                            <tr>
                                <th className='depense-table__header'>Opération</th>
                                <th className='depense-table__header'>Date</th>
                                <th className='depense-table__header'>Montant</th>
                                <th className='depense-table__header'>Actions</th>
                            </tr>
                            {depenses?.map((depense) => {
                                if (user?.user_id === depense.utilisateur && depense.type === 'OUTCOME') {
                                    return (
                                        <Fragment key={depense.id}>
                                            <tr className='depense-table__item'>
                                                <td className='depense-table__item depense-table__item--title'>{depense.short_description}</td>
                                                <td className='depense-table__item depense-table__item--date'>{depense.date}</td>
                                                <td className='depense-table__item depense-table__item--amount'>{depense.montant} €</td>
                                                <td className='depense-table__item depense-table__item--actions'>
                                                    <HiOutlinePencilAlt className='depense-table__item--update' onClick={() => toggleUpdateForm(depense)}/>
                                                    <TiDelete className='depense-table__item--delete' onClick={() => toggleDeleteForm(depense)} />
                                                </td>
                                            </tr>
                                        </Fragment>
                                    )
                                }
                            })}
                        </table>
                    </div>
                    {updateDepenseForm && (
                        <div className="depense">
                            <div className="overlay">
                                <div className="depense-content">
                                    <div className="depense-form__header">
                                        <h2 className='depense-form__title'>Modifer votre dépense</h2>
                                        <button className="depense-form__btn-close" onClick={() => toggleUpdateForm()}>
                                            <IoIosClose className='depense-form__btn-icon' />
                                        </button>
                                    </div>
                                    <form className='depense-form' onSubmit={handleUpdateSubmit}>
                                        <div className="depense-form-item">
                                            <label className="depense-form-item__label">Nom de la dépense</label>
                                            <input type="text" className="depense-form-item__input" id="descBudget" name='descBudget' onChange={(e) => setDescBudget(e.target.value)} value={descBudget} />
                                        </div>
                                        <div className="depense-form-item">
                                            <label className="depense-form-item__label">Montant</label>
                                            <input type="number" className="depense-form-item__input" id="amount" name='amount' onChange={(e) => setAmount(+e.target.value)} value={amount} />
                                        </div>
                                        <div className="depense-form-item">
                                            <label className="depense-form-item__label">Date</label>
                                            <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} dateFormat="yyyy-MM-dd" placeholderText={today}/>
                                        </div>
                                        <div className="depense-form-item">
                                            <label className="depense-form-item__label">Catégorie</label>
                                            <select
                                                className='depense-form-item__input depense-form-item__input--select'
                                                name="selectedCategory"
                                                id="selectedCategory"
                                                onChange={handleChange}
                                                value={selectedCategoryValue}>
                                                <option value="">--Choisir une catégorie--</option>
                                                {categories?.map((categorie : any) => {
                                                    return (
                                                        <option key={categorie.id} value={categorie.id}>{categorie.nom}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <button type='submit'className='btn btn-primary depense-form__btn'>Modifier</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                    {deleteDepenseForm && (
                        <div className="depense depense-modal-delete">
                            <div className="overlay">
                                <form className="depense-content" onSubmit={handleDeleteSubmit}>
                                    <div className="depense-delete-modal__header">
                                        <TiDeleteOutline className='depense-delete-modal__icon' />
                                        <h2 className='depense-delete-modal__title'>Êtes-vous sûr de supprimer ?</h2>
                                        <button className="depense-form__btn-close" onClick={() => toggleDeleteForm()}>
                                            <IoIosClose className='depense-form__btn-icon' />
                                        </button>
                                    </div>
                                    <div className="depense-delete-modal__body">
                                        <p>Si vous supprimer cette dépense vous n'aurez pas la possiblité de la récupérer.</p>
                                    </div>
                                    <div className="depense-delete__footer">
                                        <button className='btn depense-delete-modal__btn' onClick={() => toggleDeleteForm()}>Annuler</button>
                                        <button type='submit' className='btn btn-danger depense-delete-modal__btn'>Supprimer</button>
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

export default DepensesPage;
