import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { MovieLibrary } from "./MovieLibrary";
import { MovieSearching } from "./MovieSearching";

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [myMovies, setMyMovies] = useState([]);

  const apiURL = "http://www.omdbapi.com/?";
  const apiKey = "&apikey=da07d348";

  const getMovies = (e) => {
    fetch(`${apiURL}s=${title}${apiKey}`)
      .then((res) => res.json())
      .then((movies) => {
        movies.Search.map((el) => {
          fetch(`${apiURL}i=${el.imdbID}${apiKey}`)
            .then((res) => res.json())
            .then((mov) => {
              Object.assign(el, { rating: mov.Ratings[0].Value });
            });
        });

        setMovies(movies.Search);
        console.log(movies.Search);
      });

    e.preventDefault();
  };

  return (
    <BrowserRouter className="App">
      <header className="App-header">
        <Link to="/">Movie Searcher</Link>
        <Link to="/library">My Library</Link>
      </header>
      <main>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <MovieSearching
                getMovies={getMovies}
                setTitle={setTitle}
                movies={movies}
                myMovies={myMovies}
                setMyMovies={setMyMovies}
              />
            }
          />
          <Route
            path="/library"
            element={
              <MovieLibrary
                getMovies={getMovies}
                myMovies={myMovies}
                setMyMovies={setMyMovies}
              />
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
