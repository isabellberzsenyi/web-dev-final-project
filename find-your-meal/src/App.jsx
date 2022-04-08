import React from 'react';
import './vendors/bootstrap/bootstrap.min.css';
import './vendors/fontawesome/css/all.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
