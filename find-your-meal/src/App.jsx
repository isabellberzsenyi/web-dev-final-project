import React from 'react';
import './vendors/bootstrap/bootstrap.min.css';
import './vendors/fontawesome/css/all.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<SignUp />} />
            <Route path='/profile' element={<ProfileInfo />} />
            <Route path='/profile/likes' element={<ProfileLikes />} />
            <Route path='/profile/comments' element={<ProfileComments />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ProfileProvider>
  );
}

export default App;
