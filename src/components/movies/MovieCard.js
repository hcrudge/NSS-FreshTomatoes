import React from "react";
import "./Movie.css";
import { Link } from "react-router-dom";


export const MovieCard = ({ movie }) => (
  <section className="movie">
    <img
      className="movie_poster"
      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
      alt="poster"
    />
    <h3 className="movie_title">
      <Link className="movie_link" to={`/movies/detail/${movie.id}`}>{movie.title}</Link>
    </h3>
    <div className="movie__runtime">Runtime: {movie.runtime} minutes</div>
    <div className="movie_tagline">{movie.tagline}</div>
  </section>
);
