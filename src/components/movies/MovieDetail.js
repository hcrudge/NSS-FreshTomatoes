import React, { useContext, useEffect, useState } from "react";
import { MovieContext } from "./MovieProvider";
import { useParams, useHistory } from "react-router-dom";

export const MovieDetail = () => {
  const { getMovieById, deleteMovie } = useContext(MovieContext);
  const [movie, setMovie] = useState({});
  const history = useHistory();

  const { movieId } = useParams();

  useEffect(() => {
    console.log("useEffect", movieId);
    getMovieById(movieId).then((response) => {
      setMovie(response);
    });
  }, []);

  const handleDeleteMovie = (event) => {
    event.preventDefault();
    console.log("movieId", movie.id);
    deleteMovie(movie.id).then(() => {
      history.push("/");
    });
  };

  const handleEditMovie = (event) => {
    event.preventDefault();
    history.push(`/movies/edit/${movie.TMDBId}`);
  };

  const handleReturnMovieList = (event) => {
    event.preventDefault();
    history.push("/");
  };

  return (
    <section className="movie">
      <img
        className="movie_poster"
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt="poster"
      />
      <h3 className="movie__title">{movie.title}</h3>
      <div className="movie__runtime">Runtime: {movie.runtime} minutes</div>
      <div className="movie_genre">Genre: {movie.genres}</div>
      <div className="movie_synposis">{movie.overview}</div>
      <div className="movie_friend">
        Recommended By: {movie.friend?.friendName}{" "}
      </div>
      <div className="movie_comments">Comments: {movie.comments}</div>
      <button className="edit_movie" onClick={handleEditMovie}>
        Edit
      </button>
      <button className="delete_movie" onClick={handleDeleteMovie}>
        Delete
      </button>
      <br />
      <button className="return_movieList" onClick={handleReturnMovieList}>
        Return to Movie List
      </button>
    </section>
  );
};
