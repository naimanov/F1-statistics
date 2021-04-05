import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/globalContext';
import { FaBars } from 'react-icons/fa';

function Navbar() {
  const { openModal, season, toogleMenu, isMenuOpen, closeMenu } = useContext(
    GlobalContext
  );

  return (
    <header className='header'>
      <div className='navbar-wrapper'>
        <div>
          <Link to='/' className='logo'>
            F1
          </Link>
        </div>
        <nav className={`${isMenuOpen ? 'navbar navbar-open' : 'navbar'}`}>
          <ul className='navbar-menu'>
            <li>
              <Link to='/' className='navbar-link'>
                <span onClick={closeMenu}>Standings</span>
              </Link>
            </li>
            <li>
              <Link to='/schedule' className='navbar-link'>
                <span onClick={closeMenu}>Schedule</span>
              </Link>
            </li>
            <li>
              <Link to='/races' className='navbar-link'>
                <span onClick={closeMenu}>Races</span>
              </Link>
            </li>
          </ul>
        </nav>
        <button className='btn btn-season' onClick={openModal}>
          Season: {season}
        </button>
        <button
          className={`${
            isMenuOpen ? 'btn nav-toggle nav-toggle-open' : 'btn nav-toggle'
          }`}
          onClick={toogleMenu}
        >
          <FaBars />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
