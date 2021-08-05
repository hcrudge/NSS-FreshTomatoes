import React, { useContext, useEffect } from "react";
import { FriendContext } from "./FriendProvider";
import { useHistory } from "react-router-dom";
import "./Friend.css";
import { MovieContext } from "../movies/MovieProvider";

export const FriendCard = ({ friend }) => {
  const { deleteFriend, getFriends } = useContext(FriendContext);
  const { movies, getMovies } = useContext(MovieContext);
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
      </section>
    </>
  );
};
