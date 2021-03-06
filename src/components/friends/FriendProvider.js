// Component responsible for providing the friendss data to components that need it:

import React, { useState, createContext } from "react";

// The context is imported and used by individual components that need data
export const FriendContext = createContext();

export const FriendProvider = (props) => {
  const [friends, setFriends] = useState([]);

  const getFriends = () => {
    return fetch("http://localhost:8088/friends")
      .then((res) => res.json())
      .then(setFriends);
  };

  let addFriend = (friendObj) => {
    return fetch("http://localhost:8088/friends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(friendObj),
    }).then(getFriends);
  };

  const deleteFriend = (friendId) => {
    return fetch(`http://localhost:8088/friends/${friendId}`, {
      method: "DELETE",
    }).then(getFriends);
  };


  return (
    <FriendContext.Provider
      value={{
        friends,
        getFriends,
        addFriend,
        deleteFriend,
      }}
    >
      {props.children}
    </FriendContext.Provider>
  );
};
