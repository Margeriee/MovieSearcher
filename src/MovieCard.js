import React from "react";
import "./MovieCard.css";

export const MovieCard = (props) => {
  const { myMovies, setMyMovies, movie } = props;

  const handleAddToLibrary = (movie) => {
    if (myMovies.find((e) => e.imdbID === movie.imdbID)) {
      alert("Film jest już w Twojej bibliotece");
    } else {
      fetch("http://localhost:3000/library", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imdbID: movie.imdbID,
          title: movie.Title,
          poster: movie.Poster,
          rating: movie.rating,
          myGrade: "",
          checked: false,
        }),
      })
        .then((res) => res.json())
        .then((newMovie) => {
          setMyMovies([...myMovies, newMovie]);
        });

      alert("Film został dodany do Twojej biblioteki");
    }
  };

  return (
    <div className="movie-card">
      <img src={movie.Poster} alt="poster" className="poster" />
      <div className="description">
        <p>Tytuł: {movie.Title}</p>
        <p>Rok: {movie.Year}</p>
        <button onClick={() => handleAddToLibrary(movie)}>
          Dodaj do mojej bibloteki
        </button>
      </div>
    </div>
  );
};
