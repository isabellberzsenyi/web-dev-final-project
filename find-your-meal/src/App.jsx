import React from 'react';
import './vendors/bootstrap/bootstrap.min.css';
import './vendors/fontawesome/css/all.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Details from './components/Details';
import Search from './components/Search';

function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='search' element={<Search />} />
          <Route path='details/:idMeal' element={<Details />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
