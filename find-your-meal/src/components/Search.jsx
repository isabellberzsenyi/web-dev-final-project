import React, { useEffect, useRef, useState } from 'react';
import {
  Link, useParams,
} from 'react-router-dom';
import axios from 'axios';

function Search() {
  const [theMeals, setMeals] = useState([]);
  const { searchString } = useParams();
  const nameRef = useRef();
  // const navigate = useNavigate();
  // const location = useLocation();
  const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s';
  const searchMealByName = async () => {
    const response = await axios.get(`${API_URL}=${nameRef.current.value}`);
    setMeals(response.data.meals);
    // navigate(`/search/${nameRef.current.value}`);
  };

  useEffect(() => {
    if (searchString) {
      nameRef.current.value = searchString;
      searchMealByName();
    }
  }, [searchString]);

  return (
    <>
      <nav className="nav nav-tabs d-flex">
        <Link className="nav-link p-2" to='/'>Home</Link>
        <Link className="nav-link active me-auto p-2" to='search'>Search</Link>
        <Link className="nav-link p-2" to='/'>Login</Link>
        <Link className="nav-link p-2" to='/'>Sign Up</Link>
      </nav>
      <div className="bg-primary">
        <h2 className="ms-2">Search a meal</h2>
        <div className="d-flex flex-row ms-2 me-2 pb-2">
          <input ref={nameRef} className="form-control" />
          <button onClick={searchMealByName} type="button" className="btn btn-secondary">
            Search
          </button>
        </div>
      </div>
      <div>
        <ul className="list-group">
          {
            theMeals.map((meal) => (
              <li className="list-group-item" key={meal.idMeal}>
                <Link to={`/details/${meal.idMeal}`}>
                  <img
                    src={meal.strMealThumb}
                    height={60}
                    width={60}
                    className="me-4"
                    alt=""
                  />
                  {meal.strMeal}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </>
  );
}

export default Search;
