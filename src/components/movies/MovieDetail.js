import React, { useContext, useEffect, useState } from "react";
import { MovieContext } from "./MovieProvider";
import { useParams, useHistory } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";

export const MovieDetail = () => {
  const { getMovies, getMovieById, deleteMovie, updateMovie } = useContext(MovieContext);
  const [movie, setMovie] = useState({});
  const history = useHistory();
  const { movieId } = useParams();
  const [rating, setRating] = useState(0);

  useEffect(() => {
    console.log("useEffect", movieId);
    getMovieById(movieId)
      .then((response) => {
        setMovie(response);
      })
      .then(setRating(movie.userRating));
    console.log(rating);
  }, []);

  useEffect(() => {
    setRating(movie.userRating);
  }, [movie]);

  const handleRatingChange = (newRating) => {
    const userId = parseInt(sessionStorage.getItem("tomato_user"));
    updateMovie({
      id: movie.id,
      TMDBId: movie.TMDBId,
      poster_path: movie.poster_path,
      title: movie.title,
      runtime: movie.runtime,
      //  genres: movie.genres[0].name,
      overview: movie.overview,
      tagline: movie.tagline,
      userId: userId,
      friendId: movie.friendId,
      userRating: parseInt(newRating),
      comments: movie.comments,
    });
    setRating(newRating);
    console.log(parseInt(newRating));
  };

  const handleDeleteMovie = (event) => {
    event.preventDefault();
    console.log("movieId", movie.id);
    deleteMovie(movie.id).then(() => {
      getMovies().then(history.push("/"));
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
    <div className="movie_detail_wrapper parallax">
      <section className="movie_detail">
        <img
          className="movie_poster"
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt="poster"
        />
        <br />
        <br />

        <div className="starRating">
          <StarRatingComponent
            name="rate1"
            starCount={5}
            value={parseInt(rating)}
            onStarClick={handleRatingChange}
          />
        </div>
        <h3 className="movie_title">{movie.title}</h3>
        <br/>
        <div className="movie__runtime">Runtime: {movie.runtime} minutes</div>
        {/* <div className="movie_genre">Genre: {movie.genres}</div> */}
        <div className="movie_synposis">{movie.overview}</div>
        <div className="movie_friend">
          Recommended By: {movie.friend?.friendName}
        </div>
        <div className="movie_comments">Comments: {movie.comments}</div>
        <button className="edit_movie button is-black is-rounded"
          onClick={handleEditMovie}
        >
          Edit
        </button>
        <button className="delete_movie button is-black is-rounded"
          onClick={handleDeleteMovie}
        >
          Delete
        </button>
        <br />
 
        <button
          className="return_movieList button is-black is-rounded"
          onClick={handleReturnMovieList}
        >
          Return to Movie List
        </button>
      </section>
    </div>
  );
};
