import React, { useEffect } from "react";
import "./MovieLibrary.css";

export const MovieLibrary = (props) => {
  const { myMovies, setMyMovies } = props;

  useEffect(() => {
    getMyMovies();
  }, []);

  const getMyMovies = () => {
    fetch("http://localhost:3000/library")
      .then((res) => res.json())
      .then((movie) => {
        setMyMovies(movie);
      });
  };

  const handleChecked = (movie) => {
    const movieToUpdate = myMovies.find(
      (movieToFind) => movieToFind.id === movie.id
    );
    Object.assign(movieToUpdate, { checked: !movie.checked });

    setMyMovies([...myMovies]);

    fetch(`http://localhost:3000/library/${movie.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });
  };

  const updateGrade = (movie, grade) => {
    const movieToUpdate = myMovies.find(
      (movieToFind) => movieToFind.id === movie.id
    );
    Object.assign(movieToUpdate, { myGrade: grade });

    setMyMovies([...myMovies]);

    fetch(`http://localhost:3000/library/${movie.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });
  };

  const handleDelete = (movieId) => {
    fetch(`http://localhost:3000/library/${movieId}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setMyMovies(myMovies.filter((movie) => movie.id !== movieId));
      }
    });
  };

  return (
    <div className="movie-library">
      <ul>
        {myMovies.map((movie) => {
          return (
            <li key={movie.imdbID} className="movie-library-card movie-card">
              <img src={movie.poster} alt="poster" />
              <div className="description">
                <p>Tytuł: {movie.title}</p>
                <div>
                  <input
                    type="checkbox"
                    checked={movie.checked}
                    onChange={() => {
                      handleChecked(movie);
                    }}
                  />
                  <span>Obejrzane</span>
                </div>
                <div>
                  <span>Moja ocena: {movie.myGrade}</span>
                  <select
                    name="grade"
                    value={movie.myGrade}
                    onChange={(event) => {
                      updateGrade(movie, event.target.value);
                    }}
                  >
                    <option></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>

                <span>Ocena ogólna: {movie.rating}</span>
                <button
                  className="movie-library-button"
                  onClick={() => {
                    handleDelete(movie.id);
                  }}
                >
                  Usuń z mojej bibloteki
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
