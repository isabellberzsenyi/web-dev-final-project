import axios from 'axios';

const LIKES_API = 'http://localhost:4000/api/likes';

const api = axios.create({
  withCredentials: true,
});

// eslint-disable-next-line import/prefer-default-export
export const toggleLikeMeal = async (mealId, userId) => {
  const response = await api.post(`${LIKES_API}/like`, {
    mealId,
    userId,
  });
  return response.data;
};

export const getUserLikes = async (userId) => {
  const response = await api.get(`${LIKES_API}/userLikes/${userId}`);
  return response.data;
};

export const getMealLikes = async (mealId) => {
  const response = await api.get(`${LIKES_API}/mealLikes/${mealId}`);
  return response.data;
};
