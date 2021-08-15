import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MovieContext } from "./MovieProvider";
import { MovieCard } from "./MovieCard";
import "./Movie.css";
import { FriendContext } from "../friends/FriendProvider";
import { Button } from "bootstrap";

export const MovieList = () => {
  // This state changes when `getMovies` is invoked below
  const { movies, getMovies } = useContext(MovieContext);
  const { friends, getFriends } = useContext(FriendContext);
  const history = useHistory();
  const [filterMovies, setFilterMovies] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState("");
  const userId = parseInt(sessionStorage.getItem("tomato_user"));

  //useEffect - reach out through the Provider for Movies and Friends and to set the state of 'filterMovies'
  useEffect(() => {
    console.log("MovieList: Initial render before data");
    getMovies().then(getFriends).then(setFilterMovies(movies));
  }, []);

  // This useEffect is how the filter by friend is achieved. movies and selectedFriend
  // are in the dependency array so the useEffect is listening for changes to state in those arrays.
  // Thus causing a rerender when there is a change - which updates the display of movies.

  useEffect(() => {
    if (selectedFriend !== "") {
      const filtered = movies.filter(
        (movie) => movie.friendId === parseInt(selectedFriend)
      );
      setFilterMovies(filtered);
    } else {
      setFilterMovies(movies);
    }
  }, [selectedFriend, movies]);

  //   This event sets the state for the filter by friend
  const handleControlledInputChange = (event) => {
    setSelectedFriend(event.target.value);
  };

  // create an array of movie runtimes for the logged-in user
  const arrOfRuntime = filterMovies.map((movie) => {
    if (movie.userId === parseInt(sessionStorage.getItem("tomato_user")))
      console.log(movie.runtime);
    return movie.runtime;
  });

  // create the sum total of all movie runtimes for the logged-in user
  // based on the friend filter (filters time of movies recommended by friend)
  const sumOfMovieRuntime = arrOfRuntime.reduce((a, b) => a + b, 0);

  //   Create Random Movie Generator Button
  //  - returns the length of the array of movies specific to the user
  //  - creates an array of movies filtered to only include the users movies
  //  - creates an array of just the ids of the users movies
  //  - creates a random number generator based on the length of the allUserMovies array
  //  - return the selected movie id by passing the random number into the array of ids
  //  - append the movie id to the url using history.push()

  const allUserMovies = movies.filter(countOfUserMovies).length;
  function countOfUserMovies(movie) {
    return movie.userId === userId;
  }
  const arrOfUserMovies = movies.filter(arrOfMovies);
  function arrOfMovies(movie) {
    return movie.userId === userId;
  }

  const arrOfUserMovieIds = arrOfUserMovies.map((movie) => {
    return movie.id;
  });

  const randomMovie = Math.floor(Math.random() * allUserMovies);

  const selectedRandomMovie = arrOfUserMovieIds[randomMovie];

  // Creates the HTML to display the list of movies
  return (
    <div className="parallax">
      <br />
      <h1 className="MovieListHeader">MOVIE LIST</h1>
      <div className="add_movie_wrapper">
        <button
          className="add_movie_btn button is-rounded"
          onClick={() => {
            history.push("/movies/search");
          }}
        >
          Add Movie
        </button>
      </div>
      <div className="random_movie_wrapper">
        <button
          className="random_movie_btn button is-rounded"
          onClick={() => {
            history.push(`/movies/detail/${selectedRandomMovie}`);
          }}
        >
          Stop Your Scrollin'
        </button>
      </div>
      <br />
      <div className="form-group">
        <div className="friend_filter_wrapper">
          <label htmlFor="friend">Select Friend:</label>
          <select
            name="friendId"
            id="friendId"
            onChange={handleControlledInputChange}
            className="friend_filter"
            value={movies.friendId}
          >
            <option value="">See All Recommendations</option>
            {friends.map((friend) => {
              if (
                friend.userId ===
                parseInt(sessionStorage.getItem("tomato_user"))
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
        <div className="bingeMeter">
          Binge Watch Meter: {sumOfMovieRuntime} minutes
        </div>
      </div>
      <br />
      <div>
        <div className="movies">
          {/* map over array to display movie cards */}
          {filterMovies.map((movie) => {
            if (
              movie.userId === parseInt(sessionStorage.getItem("tomato_user"))
            )
              return <MovieCard key={movie.id} movie={movie} />;
          })}
        </div>
      </div>
    </div>
  );
};
