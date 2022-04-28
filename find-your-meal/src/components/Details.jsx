import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';

function Details() {
  const [mealDetails, setMealDetails] = useState({});
  const API_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i';
  const { idMeal } = useParams();
  const fetchMealByID = async () => {
    const response = await axios(`${API_URL}=${idMeal}`);
    setMealDetails(response.data);
  };
  useEffect(() => {
    fetchMealByID();
  }, []);
  return (
    <>
      <NavBar currentPage='' />
      <div className="bg-primary">
        <div className="d-flex align-items-end">
          <img
            src={mealDetails.meals && mealDetails.meals[0].strMealThumb}
            height={200}
            width={200}
            className="me-2 ms-5 mt-2 rounded"
            alt=""
          />
          <div>
            <h1 className="ms-2">{mealDetails.meals && mealDetails.meals[0].strMeal}</h1>
            <p className="fst-italic text-black ms-2">Category: {mealDetails.meals && mealDetails.meals[0].strCategory} <span className="font-weight-normal">|</span> Cuisine: {mealDetails.meals && mealDetails.meals[0].strArea}</p>
          </div>
        </div>
        <hr className="border-dark ms-5 me-5" />
        <p className="text-black ms-5 me-5 pb-1">{mealDetails.meals && mealDetails.meals[0].strInstructions}</p>
        <hr className="border-dark ms-5 me-5" />
        <div>
          <p className="fst-italic text-decoration-underline text-black ms-5 pb-3">Likes: 342 | Dislikes: 32</p>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <h5>Write a comment</h5>
          <div className="d-flex flex-column ms-2 me-2 pb-2">
            <textarea className="form-control" />
            <button type="button" className="btn btn-primary">
              Post
            </button>
          </div>

        </div>
        <ul className="list-group">
          <li className="list-group-item mb-2">
            <p className="fw-bold">Username1</p>
            <p>Love it</p>
          </li>
          <li className="list-group-item mb-2">
            <p className="fw-bold">Username2</p>
            <p>Love it</p>
          </li>
          <li className="list-group-item">
            <p className="fw-bold">Username3</p>
            <p>Love it</p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Details;
