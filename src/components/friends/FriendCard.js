import React, { useContext, useEffect, useState } from "react";
import { FriendContext } from "./FriendProvider";
import { useHistory } from "react-router-dom";
import "./Friend.css";
import { MovieContext } from "../movies/MovieProvider";
import StarRatingComponent from "react-star-rating-component";

export const FriendCard = ({ friend }) => {
  const { deleteFriend, getFriends } = useContext(FriendContext);
  const { movies, getMovies, deleteMovie } = useContext(MovieContext);
  const history = useHistory();
  const userId = parseInt(sessionStorage.getItem("tomato_user"));

  useEffect(() => {
    getFriends().then(getMovies);
  }, []);

  const moviesRecommended = movies.filter(friendRecommend).length;
  function friendRecommend(movie) {
    return movie.friendId === friend.id && movie.userId === userId;
  }

  const countOfFriendsMovies = movies.filter(countOfMovies).length;
  function countOfMovies(movie) {
    return (
      movie.friendId === friend.id &&
      movie.userId === userId &&
      movie.userRating !== 0
    );
  }

  const arrOfMovieObj = movies.filter(arrOfMovies);
  function arrOfMovies(movie) {
    return (
      movie.friendId === friend.id &&
      movie.userId === userId &&
      movie.userRating !== 0
    );
  }

  //   console.log(arrOfMovieObj);

  const filteredMovies = arrOfMovieObj.map((movie) => {
    return movie.userRating;
  });

  console.log("filtered movies", filteredMovies);

  const sumOfMovieRatings = filteredMovies.reduce((a, b) => a + b, 0);

  const averageMovieRating = sumOfMovieRatings / countOfFriendsMovies;

  //   console.log(Math.floor(averageMovieRating));

  const handleDeleteFriend = () => {
    deleteFriend(friend.id).then(() => {
      history.push("/friends");
    });
  };
  //   const find movies where friend recommended and user is friend.
  const handleDeleteMovieByFriend = () => {
    movies.map((movie) => {
      if (movie.userId === userId && movie.friendId === friend.id) {
        // console.log(movie.id);
        return deleteMovie(movie.id);
      }
    });
    getMovies();
    history.push("/friends");
  };

  return (
    <>
      <section className="friend">
        <h2 className="friend_name">{friend.friendName}</h2>
        <div>Movies Recommended to You: {moviesRecommended}</div>
        <div>Count of Friends Movies: {countOfFriendsMovies}</div>
        <br />
        <div>Average Media Compatability Score: </div>
        <div className="starRating">
          <StarRatingComponent
            name="rate1"
            starCount={5}
            value={parseInt(Math.floor(averageMovieRating))}
          />
        </div>
        <div className="delete_btn_wrapper">
          <button
            className="delete_friend_btn button is-black is-small is-rounded"
            onClick={() => {
              handleDeleteFriend();
            }}
          >
            Remove Friend
          </button>
        </div>
        <div className="delete_friend_movie_btn_wrapper">
          <button
            className="delete_friend_movie_btn button is-black is-small is-rounded"
            onClick={() => {
              handleDeleteMovieByFriend();
            }}
          >
            Remove Movies By This Friend
          </button>
        </div>
      </section>
    </>
  );
};
