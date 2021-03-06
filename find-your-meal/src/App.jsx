import React from 'react';
import './vendors/bootstrap/bootstrap.min.css';
import './vendors/fontawesome/css/all.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Details from './components/Details';
import Search from './components/Search';
import Home from './components/Home/Home';
import ProfileInfo from './components/Profile/Profile-Info';
import ProfileComments from './components/Profile/Profile-Comments';
import ProfileLikes from './components/Profile/Profile-Likes';
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
            <Route path='search/:searchString' element={<Search />} />
            <Route path='details/:idMeal' element={<Details />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<SignUp />} />
            <Route path='/profile' element={<ProfileInfo />} />
            <Route path='/profile/:userId' element={<ProfileInfo />} />
            <Route path='/profile/likes/:userId' element={<ProfileLikes />} />
            <Route path='/profile/comments/:userId' element={<ProfileComments />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ProfileProvider>
  );
}

export default App;
