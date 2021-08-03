import React, { useContext } from "react";
import { FriendContext } from "./FriendProvider";
import { useHistory } from "react-router-dom";
import "./Friend.css";

export const FriendCard = ({ friend }) => {
  const { deleteFriend } = useContext(FriendContext);
  const history = useHistory();

  const handleDeleteFriend = () => {
    deleteFriend(friend.id).then(() => {
      history.push("/friends");
    });
  };

  return (
    <>
      <section className="friend">
        <h2 className="friend__name">{friend.friendName}</h2>
        <button
          className="delete__friend"
          onClick={() => {
            handleDeleteFriend();
          }}
        >
          Remove Friend
        </button>
      </section>
    </>
  );
};
