import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MovieContext } from "./MovieProvider";
import { MovieCard } from "./MovieCard";
import "./Movie.css";
import { FriendContext } from "../friends/FriendProvider";

export const MovieList = () => {
  // This state changes when `getMovies` is invoked below
  const { movies, getMovies } = useContext(MovieContext);
  const { friends, getFriends } = useContext(FriendContext);
  const history = useHistory();
  const [filterMovies, setFilterMovies] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState("");

  //useEffect - reach out through the Provider for Movies and Friends
  useEffect(() => {
    console.log("MovieList: Initial render before data");
    getMovies().then(getFriends).then(setFilterMovies(movies));
  }, []);

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

  const handleControlledInputChange = (event) => {
    setSelectedFriend(event.target.value);
  };
  // Creates the HTML to display the list of movies
  return (
    <>
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
      <br />
      <div className="form-group">
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
      <br />
      <div className="movies">
        {/* map over array to display movie cards */}
        {filterMovies.map((movie) => {
          if (movie.userId === parseInt(sessionStorage.getItem("tomato_user")))
            return <MovieCard key={movie.id} movie={movie} />;
        })}
      </div>
    </>
  );
};
