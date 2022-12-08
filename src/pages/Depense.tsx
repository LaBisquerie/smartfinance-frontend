import React, { Fragment, SyntheticEvent, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoIosClose } from 'react-icons/io';
import { TiDelete, TiDeleteOutline, TiPlus } from 'react-icons/ti';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface DepensePageProps {}

export type Depense = {
    id: number;
    categorie_name: string;
    short_description: string;
    montant: number;
    type: 'OUTCOME' | 'INCOME';
    date: string;
    categorie: number;
    utilisateur: string;
};

const DepensePage: React.FunctionComponent<DepensePageProps> = () => {
    const [selectedDepense, setSelectedDepense] = useState<Depense | undefined>();
    const [depenseForm, setDepenseForm] = useState(false);
    const [deleteDepenseForm, setDeleteDepenseForm] = useState(false);
    const [updateDepenseForm, setUpdateDepenseForm] = useState(false);
    const [depenses, setDepenses] = useState<Depense[] | undefined>();
    const { user } = useAuth();
    const [descBudget, setDescBudget] = useState('');
    const [amount, setAmount] = useState(0);
    const [categories, setCategories] = useState<any[] | undefined>();
    const [selectedCategoryLabel, setSelectedCategoryLabel] = useState('');
    const [selectedCategoryValue, setSelectedCategoryValue] = useState(0);
    const [userScore, setUserScore] = useState(0);

    const today = format(new Date(), 'yyyy-MM-dd');
    let [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const toggleForm = () => {
        if (!depenseForm) {
            setDescBudget('');
            setAmount(0);
            setSelectedDate(new Date());
            setSelectedCategoryValue(0);
        }
        setDepenseForm(!depenseForm);
    };

    const toggleUpdateForm = (depense?: Depense) => {
        if (depense !== undefined && !updateDepenseForm) {
            setSelectedDepense(depense);
            setDescBudget(depense.short_description);
            setAmount(depense.montant);
            setSelectedDate(new Date(depense.date));
        }
        setUpdateDepenseForm(!updateDepenseForm);
    };

    const toggleDeleteForm = (depense?: Depense) => {
        if (depense !== undefined && !deleteDepenseForm) {
            setSelectedDepense(depense);
        }
        setDeleteDepenseForm(!deleteDepenseForm);
    };

    const handleChange = (e: any) => {
        let index = e.nativeEvent.target.selectedIndex;
        let label = e.nativeEvent.target[index].text;
        let value = e.target.value;
        setSelectedCategoryValue(value);
        setSelectedCategoryLabel(label);
    };

    const getUserScore = () => {
        fetch(`http://localhost:8000/api/users/${user?.user_id}/`)
            .then((response) => response.json())
            .then((res) => setUserScore(res.total_amount))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetch('http://localhost:8000/api/budgets/')
            .then((response) => response.json())
            .then((res) => setDepenses(res))
            .catch((err) => console.log(err));
        fetch('http://localhost:8000/api/categories/?type=OUTCOME')
            .then((response) => response.json())
            .then((res) => setCategories(res))
            .catch((err) => console.log(err));
        getUserScore();
    }, []);

    const createDepense = async (categorie_name: string, short_description: string, montant: number, date: string, categorie: number) => {
        const response = await fetch('http://localhost:8000/api/budgets/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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

        if (response.status === 200 || response.status === 201) {
            toast.success('votre dépense à été créée avec succès !');
            fetch('http://localhost:8000/api/budgets/')
                .then((response) => response.json())
                .then((res) => setDepenses(res))
                .catch((err) => console.log(err));

            let totalAmount = userScore - amount;

            await fetch(`http://localhost:8000/api/users/${user?.user_id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    total_amount: totalAmount
                })
            });
        } else {
            console.log('Something went wrong !');
        }
    };

    const updateDepense = async (categorie_name: string, short_description: string, montant: number, date: string, categorie: number, depenseId: number) => {
        const response = await fetch(`http://localhost:8000/api/budgets/${depenseId}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
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

        if (response.status === 200 || response.status === 201) {
            toast.success('Votre dépense à été modifiée avec succès !');
            fetch('http://localhost:8000/api/budgets/')
                .then((response) => response.json())
                .then((res) => setDepenses(res))
                .catch((err) => console.log(err));

            let totalAmount = userScore - amount;

            await fetch(`http://localhost:8000/api/users/${user?.user_id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    total_amount: totalAmount
                })
            });
        } else {
            console.log('Something went wrong');
        }
    };

    const deleteDepense = async (depenseId: number) => {
        const response = await fetch(`http://localhost:8000/api/budgets/${depenseId}/`, {
            method: 'DELETE'
        });

        if (response.status === 200 || response.status === 204) {
            toast.success('Votre dépense à bien été supprimée avec succès !');
            fetch('http://localhost:8000/api/budgets/')
                .then((response) => response.json())
                .then((res) => setDepenses(res))
                .catch((err) => console.log(err));
        } else {
            console.log('Something went wrong');
        }
    };

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        createDepense(selectedCategoryLabel, descBudget, amount, format(selectedDate!, 'yyyy-MM-dd'), selectedCategoryValue);
        setDepenseForm(!depenseForm);
    };

    const handleUpdateSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedDepense) {
            updateDepense(selectedCategoryLabel, descBudget, amount, format(selectedDate!, 'yyyy-MM-dd'), selectedCategoryValue, selectedDepense.id);
        }
        setUpdateDepenseForm(!updateDepenseForm);
    };

    const handleDeleteSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedDepense) {
            deleteDepense(selectedDepense.id);
        }
        setDeleteDepenseForm(!deleteDepenseForm);
    };

    return (
        <>
            <div className="depense">
                <ToastContainer />
                <div className="depense-header">
                    <h1 className="depense-header__title">Vos dépenses</h1>
                    <button onClick={toggleForm} className="btn btn-primary depense-header__btn d-none d-lg-block">
                        Ajouter vos dépenses
                    </button>
                    <button onClick={toggleForm} className="btn btn-primary depense-header__btn depense-header__btn-sm d-lg-none">
                        <TiPlus className="depense-header__btn-icon" />
                    </button>
                </div>
                {depenseForm && (
                    <div className="depense">
                        <div className="overlay">
                            <div className="depense-content">
                                <div className="depense-form__header">
                                    <h2 className="depense-form__title">Ajouter vos dépenses</h2>
                                    <button className="depense-form__btn-close" onClick={toggleForm}>
                                        <IoIosClose className="depense-form__btn-icon" />
                                    </button>
                                </div>
                                <form className="depense-form" onSubmit={handleSubmit}>
                                    <div className="depense-form-item">
                                        <label className="depense-form-item__label">Nom de la dépense</label>
                                        <input type="text" className="depense-form-item__input" id="descBudget" name="descBudget" onChange={(e) => setDescBudget(e.target.value)} value={descBudget} />
                                    </div>
                                    <div className="depense-form-item">
                                        <label className="depense-form-item__label">Montant</label>
                                        <input type="number" className="depense-form-item__input" id="amount" name="amount" onChange={(e) => setAmount(+e.target.value)} value={amount} />
                                    </div>
                                    <div className="depense-form-item">
                                        <label className="depense-form-item__label">Date</label>
                                        <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} dateFormat="yyyy-MM-dd" placeholderText={today} />
                                    </div>
                                    <div className="depense-form-item">
                                        <label className="depense-form-item__label">Catégorie</label>
                                        <select
                                            className="depense-form-item__input depense-form-item__input--select"
                                            name="selectedCategory"
                                            id="selectedCategory"
                                            onChange={handleChange}
                                            value={selectedCategoryValue}
                                        >
                                            <option value="null">--Choisir une catégorie--</option>
                                            {categories?.map((categorie: any) => {
                                                return (
                                                    <option key={categorie.id} value={categorie.id}>
                                                        {categorie.nom}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-primary depense-form__btn">
                                        Ajouter
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
                <div className="depense-list">
                    <div className="table-responsive-sm">
                        <table className="depense-table">
                            <tr>
                                <th className="depense-table__header">Opération</th>
                                <th className="depense-table__header">Date</th>
                                <th className="depense-table__header">Montant</th>
                                <th className="depense-table__header">Actions</th>
                            </tr>
                            {depenses?.map((depense) => {
                                if (user?.user_id === depense.utilisateur && depense.type === 'OUTCOME') {
                                    return (
                                        <Fragment key={depense.id}>
                                            <tr className="depense-table__item">
                                                <td className="depense-table__item depense-table__item--title">{depense.short_description}</td>
                                                <td className="depense-table__item depense-table__item--date">{depense.date}</td>
                                                <td className="depense-table__item depense-table__item--amount">{depense.montant} €</td>
                                                <td className="depense-table__item depense-table__item--actions">
                                                    <HiOutlinePencilAlt className="depense-table__item--update" onClick={() => toggleUpdateForm(depense)} />
                                                    <TiDelete className="depense-table__item--delete" onClick={() => toggleDeleteForm(depense)} />
                                                </td>
                                            </tr>
                                        </Fragment>
                                    );
                                }
                            })}
                        </table>
                    </div>
                    {updateDepenseForm && (
                        <div className="depense">
                            <div className="overlay">
                                <div className="depense-content">
                                    <div className="depense-form__header">
                                        <h2 className="depense-form__title">Modifer votre dépense</h2>
                                        <button className="depense-form__btn-close" onClick={() => toggleUpdateForm()}>
                                            <IoIosClose className="depense-form__btn-icon" />
                                        </button>
                                    </div>
                                    <form className="depense-form" onSubmit={handleUpdateSubmit}>
                                        <div className="depense-form-item">
                                            <label className="depense-form-item__label">Nom de la dépense</label>
                                            <input
                                                type="text"
                                                className="depense-form-item__input"
                                                id="descBudget"
                                                name="descBudget"
                                                onChange={(e) => setDescBudget(e.target.value)}
                                                value={descBudget}
                                            />
                                        </div>
                                        <div className="depense-form-item">
                                            <label className="depense-form-item__label">Montant</label>
                                            <input type="number" className="depense-form-item__input" id="amount" name="amount" onChange={(e) => setAmount(+e.target.value)} value={amount} />
                                        </div>
                                        <div className="depense-form-item">
                                            <label className="depense-form-item__label">Date</label>
                                            <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} dateFormat="yyyy-MM-dd" placeholderText={today} />
                                        </div>
                                        <div className="depense-form-item">
                                            <label className="depense-form-item__label">Catégorie</label>
                                            <select
                                                className="depense-form-item__input depense-form-item__input--select"
                                                name="selectedCategory"
                                                id="selectedCategory"
                                                onChange={handleChange}
                                                value={selectedCategoryValue}
                                            >
                                                <option value="null">--Choisir une catégorie--</option>
                                                {categories?.map((categorie: any) => {
                                                    return (
                                                        <option key={categorie.id} value={categorie.id}>
                                                            {categorie.nom}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        <button type="submit" className="btn btn-primary depense-form__btn">
                                            Modifier
                                        </button>
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
                                        <TiDeleteOutline className="depense-delete-modal__icon" />
                                        <h2 className="depense-delete-modal__title">Êtes-vous sûr de supprimer ?</h2>
                                        <button className="depense-form__btn-close" onClick={() => toggleDeleteForm()}>
                                            <IoIosClose className="depense-form__btn-icon" />
                                        </button>
                                    </div>
                                    <div className="depense-delete-modal__body">
                                        <p>Si vous supprimer cette dépense vous n'aurez pas la possiblité de la récupérer.</p>
                                    </div>
                                    <div className="depense-delete__footer">
                                        <button className="btn depense-delete-modal__btn" onClick={() => toggleDeleteForm()}>
                                            Annuler
                                        </button>
                                        <button type="submit" className="btn btn-danger depense-delete-modal__btn">
                                            Supprimer
                                        </button>
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

export default DepensePage;
