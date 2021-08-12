import React, { useContext, useEffect } from "react";
import { FriendContext } from "./FriendProvider";
import { useHistory } from "react-router-dom";
import "./Friend.css";
import { MovieContext } from "../movies/MovieProvider";

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
  const handleDeleteFriend = () => {
    deleteFriend(friend.id).then(() => {
      history.push("/friends");
    });
  };
  //   const find movies where friend recommended and user is friend.
  const handleDeleteMovieByFriend = () => {
    movies.map((movie) => {
      if (movie.userId === userId && movie.friendId === friend.id){

            console.log(movie.id)  
              return deleteMovie(movie.id);
        }
      
        
    });
    getMovies();
    history.push("/friends");
  };

  //   {filterMovies.map((movie) => {
  //     if (movie.userId === parseInt(sessionStorage.getItem("tomato_user")))
  //       return <MovieCard key={movie.id} movie={movie} />;
  //   })}
  return (
    <>
      <section className="friend">
        <h2 className="friend_name">{friend.friendName}</h2>
        <div>Movies Recommended to You: {moviesRecommended}</div>
        <br />
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
