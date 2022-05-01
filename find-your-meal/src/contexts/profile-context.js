import React, { createContext, useContext, useEffect, useState } from 'react';
import * as userService from '../service/user-service';

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState();

  const signout = async () => {
    await userService.signout();
    setProfile(null);
  };

  const signin = async (email, password) => {
    try {
      const data = await userService.signin(email, password);
      setProfile(data);
    } catch (e) {
      console.log(e);
    }
  };

  const signup = async (email, password, firstName, lastName, accountType) => {
    try {
      const data = await userService.signup(email, password, firstName, lastName, accountType);
      setProfile(data);
    } catch (e) {
      console.log(e);
    }
  };

  const checkLoggedIn = async () => {
    try {
      const data = await userService.checkLoggedIn();
      setProfile(data);
    } catch (e) {
      console.log(e);
    }
  };

  const updateUser = async (userId, email, password, firstName, lastName, accountType) => {
    try {
      const data = await userService.updateUser(
        userId,
        email,
        password,
        firstName,
        lastName,
        accountType,
      );
      setProfile(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const value = {
    signout,
    signin,
    profile,
    signup,
    checkLoggedIn,
    updateUser,
  };
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export const useProfile = () => useContext(ProfileContext);
