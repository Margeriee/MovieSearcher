import "./MovieSearching.css";
import React from "react";
import { MovieCard } from "./MovieCard";

export const MovieSearching = (props) => {
  const { getMovies, setTitle, movies, myMovies, setMyMovies } = props;

  return (
    <>
      <form onSubmit={getMovies}>
        <label>Wpisz wyszukiwany tytuł: </label>
        <input
          type="text"
          id="searchText"
          placeholder="Movie title..."
          onChange={(event) => setTitle(event.target.value)}
        ></input>
        <button>Wyszukaj</button>
      </form>
      <div className="movies-results">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            myMovies={myMovies}
            setMyMovies={setMyMovies}
          />
        ))}
      </div>
    </>
  );
};
