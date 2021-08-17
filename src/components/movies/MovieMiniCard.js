import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { MovieContext } from "./MovieProvider";

export const MovieMiniCard = ({ movie }) => {
  const history = useHistory();
  const { movies } = useContext(MovieContext);
  const userId = parseInt(sessionStorage.getItem("tomato_user"));

  // captures the id for the selected movie and saves it in setMovie and then set the url to call the MovieForm
  const handleClickSelectMovie = (event) => {
    event.preventDefault();
    console.log(movie.id);
    if (movies.find((m) => movie.id === m.TMDBId && m.userId === userId)) {
      window.alert("This movie is already on your Movie List!");
    } else {
      history.push(`/movies/create/${event.target.value}`);
    }
  };

  const imageURL = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`;
  // Displays movie poster and title for items returned in the
  // search function in the MovieSearch component
  return (
    <section className="mini_movie_container">
      <img className="mini_movie_poster" src={imageURL} alt="poster" />
      <h3 className="mini_movie-title">{movie.title}</h3>
      <div className="select_wrapper">
      <button
        className="mini_movie_add_btn button is-black is-rounded"
        value={movie.id}
        onClick={handleClickSelectMovie}
      >
        Select
      </button>
      </div>
    </section>
  );
};
