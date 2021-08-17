import "./Movie.css";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { fetchMovie, MovieContext } from "./MovieProvider";
import { FriendContext } from "../friends/FriendProvider";

export const MovieForm = () => {
  const { movies, getMovies, getMovieByTMDBId, addMovie, updateMovie } =
    useContext(MovieContext);
  const history = useHistory();
  const { movieId } = useParams();
  const { friends, getFriends } = useContext(FriendContext);

  const [movie, setMovie] = useState({
    TMDBId: 0,
    poster_path: "",
    title: "",
    runtime: 0,
    genres: [],
    overview: "",
    tagline: "",
    userId: 0,
    friendId: 0,
    userRating: 0,
    comments: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMovies().then(() => {
      if (
        movies.find(
          (m) =>
            parseInt(movieId) === m.TMDBId &&
            m.userId === parseInt(sessionStorage.getItem("tomato_user"))
        )
      ) {
        getMovieByTMDBId(parseInt(movieId))
          .then((jsonMovieObj) => {
            setMovie(jsonMovieObj);
          })
          .then(setIsLoading(false));
      } else {
        fetchMovie(movieId)
          .then((movie) => {
            setMovie(movie);
            setIsLoading(false);
          })
          .then(getFriends);
      }
    });
  }, []);

  useEffect(() => {
    console.log(movie);
  }, [movie]);

  const saveNewMovie = () => {
    const userId = parseInt(sessionStorage.getItem("tomato_user"));
    const addNewMovie = {
      TMDBId: parseInt(movieId),
      poster_path: movie.poster_path,
      title: movie.title,
      runtime: movie.runtime,
      // genres: movie.genres[0].name,
      overview: movie.overview,
      tagline: movie.tagline,
      userId: userId,
      friendId: parseInt(movie.friendId),
      userRating: 0,
      comments: movie.comments,
    };
    addMovie(addNewMovie).then(() => history.push("/"));
  };

  const saveEditMovie = () => {
    const userId = parseInt(sessionStorage.getItem("tomato_user"));
    updateMovie({
      id: movie.id,
      TMDBId: parseInt(movieId),
      poster_path: movie.poster_path,
      title: movie.title,
      runtime: movie.runtime,
      //  genres: movie.genres[0].name,
      overview: movie.overview,
      tagline: movie.tagline,
      userId: userId,
      friendId: parseInt(movie.friendId),
      userRating: movie.userRating,
      comments: movie.comments,
    }).then(() => history.push("/"));
  };

  const handleControlledInputChange = (event) => {
    const newMovie = { ...movie };
    newMovie[event.target.id] = event.target.value;
    setMovie(newMovie);
  };
  const handleReturnMovieList = (event) => {
    event.preventDefault();
    history.push("/");
  };

  const handleClickSaveMovie = (event) => {
    event.preventDefault();
    if (movie.friendId === 0) {
      window.alert("Please select a friend");
    } else {
      setIsLoading(true);

      if (
        movies.find(
          (m) =>
            parseInt(movieId) === m.TMDBId &&
            m.userId === parseInt(sessionStorage.getItem("tomato_user"))
        )
      ) {
        saveEditMovie();
      } else {
        saveNewMovie();
      }
    }
  };

  return (
      <div className="movie_detail_wrapper parallax">
    <section className="movie_detail">
      <img
        className="movie_poster"
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt="poster"
      />
      <h2 className="movie_title">{movie.title}</h2>
      <div className="movie_runtime">Runtime: {movie.runtime} minutes</div>
      {/* <div className="movie_genre">Genre: { movie.genres[0]?.name }</div> */}
      <div className="movie_synposis">{movie.overview}</div>
      <br />
      <div className="form-group">
        <label className="friend_name" htmlFor="friend">Select Friend: </label>
        <select
          name="friendId"
          id="friendId"
          className="form-control"
          value={movie.friendId}
          onChange={handleControlledInputChange}
        >
          <option value="0">Select a friend</option>
          {friends.map((friend) => {
            if (
              friend.userId === parseInt(sessionStorage.getItem("tomato_user"))
            ) {
              return (
                <option key={friend.id} value={friend.id}>
                  {friend.friendName}
                </option>
              );
            }
          })}
        </select>
      </div>
      <fieldset>
        <div className="form-group">
          <label className="movie_comments_lable" htmlFor="movie_comments">Comments:</label>
          <textarea
            type="text"
            id="comments"
            required
            autoFocus
            className="form-control"
            placeholder="comments"
            value={movie.comments}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <button className="add_movie_button button is-black is-rounded" onClick={handleClickSaveMovie}>
        Save
      </button>
      <button className="return_movieList button is-black is-rounded" onClick={handleReturnMovieList}>
        Cancel
      </button>
    </section>
    </div>
  );
};
