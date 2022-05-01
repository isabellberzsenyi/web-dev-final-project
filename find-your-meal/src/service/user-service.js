import axios from 'axios';

const USER_API = 'http://localhost:4000/api/users';

const api = axios.create({
  withCredentials: true,
});

export const signout = async () => {
  await api.post(`${USER_API}/signout`);
  return null;
};

export const signup = async (email, password, firstName, lastName, accountType) => {
  const response = await api.post(`${USER_API}/signup`, {
    email,
    password,
    firstName,
    lastName,
    accountType,
  });
  return response.data;
};

export const signin = async (email, password) => {
  const response = await api.post(`${USER_API}/signin`, { email, password });
  return response.data;
};

export const checkLoggedIn = async () => {
  const response = await api.get(`${USER_API}/profile`);
  return response.data;
};

export const updateUser = async (userId, email, password, firstName, lastName, accountType) => {
  console.log('Update', userId);
  const response = await api.put(`${USER_API}/profile/${userId}`, {
    userId,
    email,
    password,
    firstName,
    lastName,
    accountType,
  });
  return response.data;
};
