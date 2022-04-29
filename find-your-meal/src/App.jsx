import React from 'react';
import './vendors/bootstrap/bootstrap.min.css';
import './vendors/fontawesome/css/all.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Details from './components/Details';
import Search from './components/Search';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { ProfileProvider } from './contexts/profile-context';

function App() {
  return (
    <ProfileProvider>
      <BrowserRouter>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='search' element={<Search />} />
            <Route path='details/:idMeal' element={<Details />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<SignUp />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ProfileProvider>
  );
}

export default App;
