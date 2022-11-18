import React from 'react'
import logo from '../logo.png'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-header">
        <img src={logo} alt="logo" width={80} height={80} loading="lazy" />
      </div>
      <div className="sidebar-main">
        <div className='sidebar-content'>
          <ul className="sidebar-list list-unstyled">
            <li className="sidebar-list__item"><Link to='/' className='sidebar-list__link'>Dashboard</Link></li>
            <li className="sidebar-list__item"><Link to='/depenses' className='sidebar-list__link'>Dépenses</Link></li>
            <li className="sidebar-list__item"><Link to='/revenus' className='sidebar-list__link'>Revenus</Link></li>
            <li className="sidebar-list__item"><Link to='/statistiques' className='sidebar-list__link'>Statistiques</Link></li>
          </ul>
        </div>
      </div>
      <div className="sidebar-footer">
        <Link to='/settings'>ecrou</Link>
      </div>
    </div>
  )
}

export default Sidebar;