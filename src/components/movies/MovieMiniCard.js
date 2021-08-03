import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { fetchMovie, MovieContext } from "./MovieProvider";

export const MovieMiniCard = ({ movie }) => {
  const history = useHistory();
  const { movies, setMovie } = useContext(MovieContext);

  // captures the id for the selected movie and saves it in setMovie and then set the url to call the MovieForm
  const handleClickSelectMovie = (event) => {
    event.preventDefault();
    console.log(movie.id);
    if (movies.find((m) => movie.id === m.TMDBId)) {
      window.alert("This movie is already on your Movie List!");
    } else {
      // fetchMovie(event.target.value)
      // setMovie(event.target.value)
      history.push(`/movies/create/${event.target.value}`);

      // console.log(event.target.value)
    }
  };

  const imageURL = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`;
  // Displays movie poster and title for items returned in the
  // search function in the MovieSearch component
  return (
    <div className="mini_movie_outside">
      <div className="mini_movie_container">
        <img className="mini_movie_poster" src={imageURL} alt={movie.title} />
        <h3 className="mini_movie-title">{movie.title}</h3>
        <button
          className="mini_movie_add_buton"
          value={movie.id}
          onClick={handleClickSelectMovie}
        >
          Select
        </button>
      </div>
    </div>
  );
};
