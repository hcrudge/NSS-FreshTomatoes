import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FriendContext } from "./FriendProvider";
import { FriendCard } from "./FriendCard";
import { UserContext } from "../users/UserProvider";
import "./Friend.css";

export const FriendList = () => {
  // used to manage state
  const { friends, getFriends } = useContext(FriendContext);
  const { users, getUsers } = useContext(UserContext);
  const history = useHistory();

  // event listener to reach out and get friends and users upon initial render.
  useEffect(() => {
    getFriends().then(getUsers);
  }, []);

  // JSX to display the header, button and map over the friend cards from FriendCard.js
  return (
    <div className="parallax">
      <h1 className="friends_header">FRIENDS LIST</h1>
      <div className="add_friend_wrapper">
        <button
          className="add__friend__btn button is-rounded"
          onClick={() => {
            history.push("/friends/create");
          }}
        >
          Add Friend
        </button>
      </div>

      <div className="friends">
        {/* map over array to display friend cards for user */}
        {friends.map((friend) => {
          if (
            friend.userId === parseInt(sessionStorage.getItem("tomato_user"))
          ) {
            return <FriendCard key={friend.id} friend={friend} />;
          }
        })}
      </div>
    </div>
  );
};
