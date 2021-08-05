import React from "react";
import { Route } from "react-router-dom";

import { MovieList } from "./movies/MovieList";
import { MovieProvider } from "./movies/MovieProvider";
import { MovieForm } from "./movies/MovieForm";
import { MovieDetail } from "./movies/MovieDetail";
import { FindMovie } from "./movies/MovieSearch";

import { UserProvider } from "./users/UserProvider";

import { FriendProvider } from "./friends/FriendProvider";
import { FriendList } from "./friends/FriendList";
import { FriendForm } from "./friends/FriendForm";

export const ApplicationViews = () => {
  return (
    <>
      {/* Render the location list when http://localhost:3000/ */}
      <MovieProvider>
        <UserProvider>
          <FriendProvider>
            <Route exact path="/">
              <MovieList />
            </Route>
            <Route exact path="/movies/search">
              <FindMovie />
            </Route>
            <Route exact path="/movies/create/:movieId(\d+)">
              <MovieForm />
            </Route>
            <Route exact path="/movies/edit/:movieId(\d+)">
              <MovieForm />
            </Route>
            <Route exact path="/movies/detail/:movieId(\d+)">
              <MovieDetail />
            </Route>
          <Route exact path="/friends">
            <FriendList />
          </Route>
          <Route exact path="/friends/create">
            <FriendForm />
          </Route>
          </FriendProvider>
        </UserProvider>
      </MovieProvider>

      
    </>
  );
};
