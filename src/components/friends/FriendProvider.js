// Component responsible for providing the friendss data to components that need it:

import React, { useState, createContext } from "react";

// The context is imported and used by individual components that need data
export const FriendContext = createContext();

export const FriendProvider = (props) => {

    const [friends, setFriends] = useState([])

    const getFriends = () => {
        return fetch("http://localhost:8088/friends")
        .then(res => res.json())
        .then(setFriends)
    }

    // let addFriend = (friendObj) => {
    //     return fetch("http://localhost:8088/friends", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(friendObj)
    //     })
    //     .then(getFriends)
    // };

    // const deleteFriend = (friendObjId) => {
        
    //     return fetch(`http://localhost:8088/friends/${friendObjId}`, {
    //         method: "DELETE"
    //     })
    //         .then(getFriends)
    // }   

    // const getFriendById = (id) => {
    //     return fetch(`http://localhost:8088/friends/${id}?_expand=user`)
    //         .then(res => res.json())
    // };
    
    return (
        <FriendContext.Provider value ={{
            friends, getFriends
        }}>
            {props.children}
        </FriendContext.Provider>
    )
}