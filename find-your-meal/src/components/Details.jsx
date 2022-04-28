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

  const [ingredientList, setIngredientList] = useState({});

  const getIngredients = async () => {
    const tempIngredientList = [];
    for (let i = 1; i < 21; i += 1) {
      const listNum = `strIngredient${i}`;
      if (mealDetails.meals && mealDetails.meals[0][listNum] !== '') {
        tempIngredientList.push(mealDetails.meals[0][listNum]);
      }
    }
    setIngredientList(tempIngredientList);
  };

  useEffect(() => {
    fetchMealByID();
  }, []);

  useEffect(() => {
    getIngredients();
  }, [mealDetails]);
  return (
    <>
      <NavBar currentPage='' />
      <div className="bg-primary">
        <div className="d-flex">
          <div>
            <div className="d-flex align-items-end">
              <img
                src={mealDetails.meals && mealDetails.meals[0].strMealThumb}
                height={200}
                width={200}
                className="ms-5 mt-2 rounded"
                alt=""
              />
              <div>
                <h1 className="ms-2">{mealDetails.meals && mealDetails.meals[0].strMeal}</h1>
                <p className="fw-bold text-secondary ms-2">Category: {mealDetails.meals && mealDetails.meals[0].strCategory}  <span className="fst-normal"> |</span> Cuisine: {mealDetails.meals && mealDetails.meals[0].strArea}</p>
              </div>
            </div>
            <hr className="border-dark ms-5 me-5" style={{ color: 'black' }} />
            <p className="text-black ms-5 me-5 pb-1">{mealDetails.meals && mealDetails.meals[0].strInstructions}</p>
            <hr className="border-dark ms-5 me-5" style={{ color: 'black' }} />
          </div>
          <div className="me-5 mt-2 col-3 align-self-center">
            <ul className="list-group">
              <li className="list-group-item disabled fw-bold text-decoration-underline text-primary bg-secondary border border-primary">Ingredients</li>
              {
                ingredientList.map && ingredientList.map((ingredientItem) => <li className="list-group-item bg-dark border border-primary" key={ingredientItem}>{ingredientItem}</li>)
              }
            </ul>
          </div>
        </div>
        <div>
          <p className="fw-bold text-black ms-5 pb-3"><i className="fas fa-heart text-info" /> 342 | <i className="fas fa-heart-broken text-secondary" /> 32</p>
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
