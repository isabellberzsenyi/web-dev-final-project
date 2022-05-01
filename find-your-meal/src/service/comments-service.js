import axios from 'axios';

const COMMENTS_API = 'http://localhost:4000/api/comments';

const api = axios.create({
  withCredentials: true,
});

// eslint-disable-next-line import/prefer-default-export
export const createComment = async (mealId, userId, comment) => {
  const response = await api.post(`${COMMENTS_API}/comment`, {
    mealId,
    userId,
    comment,
  });
  return response.data;
};

export const getUserComments = async (userId) => {
  const response = await api.get(`${COMMENTS_API}/userComments/${userId}`);
  return response.data;
};

export const getMealComments = async (mealId) => {
  const response = await api.get(`${COMMENTS_API}/mealComments/${mealId}`);
  return response.data;
};
