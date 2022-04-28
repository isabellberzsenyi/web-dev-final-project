import React from 'react';
import { Link } from 'react-router-dom';

function NavBar({ currentPage }) {
  const linkClassName = (page) => `nav-link p-2 ${currentPage === page ? 'active' : ''}`;
  return (
    <nav className='nav nav-tabs d-flex'>
      <Link className={linkClassName('home')} to='/'>
        Home
      </Link>
      <Link className={`${linkClassName('search')} me-auto`} to='/search'>
        Search
      </Link>
      <Link className={linkClassName('login')} to='/login'>
        Login
      </Link>
      <Link className={linkClassName('signup')} to='/login'>
        Sign Up
      </Link>
    </nav>
  );
}

export default NavBar;
