import React, { Fragment } from 'react';
import { useEffect, useState, SyntheticEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { format } from 'date-fns';
import DatePicker from "react-datepicker";

export interface ISettingsPageProps { }

export type UserData = {
    "id": number;
    "first_name": string,
    "last_name": string,
    "date_of_birth": string | any,
    "email": string,
}

const SettingsPage: React.FunctionComponent<ISettingsPageProps> = () => {
    const { logoutUser, user } = useAuth();
    const [dataUser, setDataUser] = useState<UserData | undefined>();
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userDateOfBirth, setUserDateOfBirth] = useState<Date | null>(null);


    const getUserData = () => {
        fetch(`http://localhost:8000/api/users/${user?.user_id}/`)
            .then(response => response.json() as Promise <UserData>)
            .then((res) => {
                setDataUser(res)
                setUserFirstName(res.first_name)
                setUserLastName(res.last_name)
                setUserEmail(res.email)
                setUserDateOfBirth(new Date(res.date_of_birth))
            } )
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getUserData();
    }, [])

    const updateUser = async (last_name: string, first_name: string, email: string, date_of_birth: string) => {
        const response = await fetch(`http://localhost:8000/api/users/${user?.user_id}/`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                last_name,
                first_name,
                email,
                date_of_birth,
                utilisateur: user?.user_id
            })
        });

        const data = await response.json();
        if (response.status === 200 || response.status === 201) {
            toast.success('Votre dépense à été modifiée avec succès !');
            getUserData();
        } else {
            console.log('Something went wrong');

        }
    }

    const handleUpdateUser = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (dataUser) {
            updateUser(userLastName, userFirstName, userEmail, format(userDateOfBirth!, 'yyyy-MM-dd'));
        }
    }

    return (
        <Fragment>

            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row">
                    <div className="col-md-5 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5"
                            width="150px"
                            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" /><span
                                className="font-weight-bold">{dataUser?.last_name} {dataUser?.first_name}<br /><br />Date de naissance :  {dataUser?.date_of_birth}<br /></span>
                            <span className="text-black-50 mt-3">{dataUser?.email}</span>  <br />
                            <span></span>
                        </div>
                    </div>
                    <div className="col-md-6 border-right">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">Modification profil</h4>
                            </div>


                            <form className='depense-form' onSubmit={handleUpdateUser}>


                                <div className="row mt-2">
                                    <div className="col-md-6"><label className="labels">Nom</label><input type="text" className="form-control"
                                        onChange={(e) => setUserLastName(e.target.value)} defaultValue={dataUser?.last_name} /></div>
                                    <div className="col-md-6"><label className="labels">Prenom</label><input type="text" className="form-control"
                                        onChange={(e) => setUserFirstName(e.target.value)} defaultValue={dataUser?.first_name} /></div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12"><label className="labels">Email</label><input type="text"
                                        className="form-control" onChange={(e) => setUserEmail(e.target.value)} defaultValue={dataUser?.email} /></div>
                                    <div className="col-md-12 mt-3"><label className="labels">Date de naissance : </label>
                                        <DatePicker className="form-control" selected={userDateOfBirth} onChange={date => setUserDateOfBirth(date)} dateFormat="yyyy-MM-dd" placeholderText={dataUser?.date_of_birth} />
                                    </div>
                                </div>

                                <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="submit">
                                    Enregistrer</button></div>

                            </form>


                        </div>
                    </div>
                </div>
            </div>



        </Fragment >
    );
};

export default SettingsPage;
