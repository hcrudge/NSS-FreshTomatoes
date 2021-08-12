import "./Movie.css";
import React, { useState, useRef } from "react";
import { searchMovie } from "./MovieProvider";
import { MovieMiniCard } from "./MovieMiniCard";

export const FindMovie = () => {
  const [movies, setMovies] = useState([]);
  const searchInput = useRef("");

  const handleSearch = () => {
    console.log(searchInput.current.value);
    const searchedMovie = searchInput.current.value;
    if (searchedMovie === "") {
      window.alert("Please Search For a Movie Title");
    } else {
      searchMovie(searchedMovie).then((response) => {
        console.log(response.results);
        setMovies(response.results);
      });
    }
  };

 
  const handleClearSearch = () => {
      searchInput.current.value = "";
     setMovies()
  }
  return (
    <div className="parallax">
      
        <h1 className="search_movie_lable">Search For A Movie</h1>
        <br/>
        <div className="search_wrapper"> 
        <input
          ref={searchInput}
          type="text"
          required
          autoFocus
          placeholder="Movie Title"
          className="form-control-search search_input"
        ></input>
        </div>
        <br />
        <br />
        <div className="button_div">
          <button className="search_button button is-rounded" onClick={handleSearch}>
            Search
          </button>
          <button className="clear_search_button button is-rounded" onClick={handleClearSearch}>
            Clear Search Results
          </button>
        </div>
        <div className="search_results_wrapper">
          {movies?.map((m) => (
            <MovieMiniCard key={m.id} movie={m} />
          ))}
        </div>
    </div>
  );
};
