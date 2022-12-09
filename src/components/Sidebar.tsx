import React, { useState } from 'react';
import logo from '../logo.png';
import { NavLink, Link } from 'react-router-dom';
import { BsHouse } from 'react-icons/bs';
import { BiTransfer } from 'react-icons/bi';
import { FiCreditCard, FiPieChart, FiSettings, FiMenu } from 'react-icons/fi';

interface SidebarProps {}

const Sidebar: React.FunctionComponent<SidebarProps> = () => {
    const [status, setStatus] = useState(false);

    return (
        <>
            <div className={`sidebar ${status ? 'open' : 'false'}`}>
                <div className="sidebar-header">
                    <Link to="/" className="d-none d-md-block">
                        <img className="img-fluid" src={logo} alt="logo" width={80} height={80} loading="lazy" />
                    </Link>
                    <button className="sidebar-button" onClick={() => setStatus(!status)}>
                        <FiMenu />
                    </button>
                </div>
                <div className="sidebar-main">
                    <ul className="sidebar-list list-unstyled">
                        <li className="sidebar-list__item">
                            <NavLink
                                to="/"
                                style={({ isActive }) => {
                                    return { borderColor: isActive ? 'white' : '', backgroundColor: isActive ? '#3558A8' : '' };
                                }}
                                className="sidebar-list__link"
                            >
                                <BsHouse />
                                <span className="sidebar-list__link--label">Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-list__item">
                            <NavLink
                                to="/depenses"
                                style={({ isActive }) => {
                                    return { borderColor: isActive ? 'white' : '', backgroundColor: isActive ? '#3558A8' : '' };
                                }}
                                className="sidebar-list__link"
                            >
                                <BiTransfer />
                                <span className="sidebar-list__link--label">Dépenses</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-list__item">
                            <NavLink
                                to="/revenus"
                                style={({ isActive }) => {
                                    return { borderColor: isActive ? 'white' : '', backgroundColor: isActive ? '#3558A8' : '' };
                                }}
                                className="sidebar-list__link"
                            >
                                <FiCreditCard />
                                <span className="sidebar-list__link--label">Revenus</span>
                            </NavLink>
                        </li>
                        {/* <li className="sidebar-list__item">
                            <NavLink
                                to="/statistiques"
                                style={({ isActive }) => {
                                    return { borderColor: isActive ? 'white' : '', backgroundColor: isActive ? '#3558A8' : '' };
                                }}
                                className="sidebar-list__link"
                            >
                                <FiPieChart />
                                <span className="sidebar-list__link--label">Statistiques</span>
                            </NavLink>
                        </li> */}
                    </ul>
                </div>
                <div className="sidebar-footer">
                    <NavLink
                        to="/settings"
                        style={({ isActive }) => {
                            return { borderColor: isActive ? 'white' : '', backgroundColor: isActive ? '#3558A8' : '' };
                        }}
                        className="sidebar-list__link"
                    >
                        <FiSettings />
                        <span className="sidebar-list__link--label">Paramètres</span>
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
