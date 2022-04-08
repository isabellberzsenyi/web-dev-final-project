import axios from 'axios';

const API_URL = 'http://localhost:4000/';

const example = async () => {
  const response = await axios.get(API_URL);
  return response;
};

export default example;
