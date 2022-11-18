import React from 'react'
import logo from '../logo.png'
import {Link} from 'react-router-dom'

function Footer() {
  return (
    <div className='footer'>
      <div className="container">
        <div className="row g-5">
          <div className="col-12 col-lg-5">
            <div className="footer-infos">
              <img className='img-fluid footer-infos__img' src={logo} alt="logo" />
              <div className="footer-infos__info">
                <p className="footer-infos__desc">Votre outils de gestion de finance préféré</p>
                <p className='footer-infos__mail'>work@smart-finance.com</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-7">
            <div className="footer-links">
              <div className="footer-link">
                <h3 className='footer-link__title'>Informations</h3>
                <ul className='footer-link__list list-unstyled'>
                  <li className="footer-link__item"><Link to="/">View cases</Link></li>
                  <li className="footer-link__item"><Link to="/">Contact us</Link></li>
                </ul>
              </div>
              <div className="footer-link">
                <h3 className='footer-link__title'>Retrouvez-nous</h3>
                <ul className='footer-link__list list-unstyled'>
                  <li className="footer-link__item">Ynov Campus</li>
                  <li className="footer-link__item space">2 places de l'europe <br />31000 Toulouse</li>
                  <li className="footer-link__item">+33 5 82 95 10 48</li>
                </ul>
              </div>
              <div className="footer-link">
                <h3 className='footer-link__title'>Contactez-nous</h3>
                <ul className='footer-link__list list-unstyled'>
                  <li className="footer-link__item"><Link to="/">Linkedin</Link></li>
                  <li className="footer-link__item"><Link to="/">Instagram</Link></li>
                  <li className="footer-link__item"><Link to="/">Facebook</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-after">
            <p className='footer-after__text'>designed by Ynov - built by Ynov students - @2022</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer