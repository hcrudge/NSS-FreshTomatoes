import React, { useContext, useEffect, useState } from "react";
import { useHistory} from "react-router-dom";
import { UserContext } from "../users/UserProvider";
import { FriendContext } from "./FriendProvider";

export const FriendForm = () => {
  // manage state
  const { addFriend, getFriends } = useContext(FriendContext);
  const { users, getUsers } = useContext(UserContext);
  const history = useHistory();

  const [friend, setFriend] = useState({
    friendName: "",
    icon: "",
    userId: 0,
  });

  useEffect(() => {
    getFriends().then(getUsers);
  }, []);

  const handleControlledInputChange = (event) => {
    event.preventDefault();
    const newFriend = { ...friend };
    newFriend[event.target.id] = event.target.value;
    setFriend(newFriend);
  };

  const handleClickAddFriend = (event) => {
    event.preventDefault();
    const userId = parseInt(sessionStorage.getItem("tomato_user"));
    const addNewFriend = {
      friendName: friend.name,
      icon: "",
      userId: userId,
    };

    addFriend(addNewFriend).then(() => history.push("/friends"));
  };

  return (
    <form className="friendForm parallax">
      <fieldset>
        <div>
          <div className="name_wrapper">
          <label className="name" htmlFor="name"> FRIEND NAME:</label>
          </div>
          <div className="friend_input_wrapper">
          <input
            type="text"
            id="name"
            required
            autoFocus
            className="friend_name_input"
            placeholder="Name"
            value={friend.name}
            onChange={handleControlledInputChange}
          />
        </div>
        </div>
      </fieldset>
      <div className="save_friend_wrapper">
      <button className="save_friend_btn button is-rounded" onClick={handleClickAddFriend}>
        Add As A Friend
      </button>
      </div>
    </form>
  );
};
