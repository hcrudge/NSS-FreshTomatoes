import React from "react"
import { Route } from "react-router-dom"
import { MovieList } from "./movies/MovieList"
import { MovieProvider } from "./movies/MovieProvider"
import { UserProvider } from "./users/UserProvider"
import { MovieDetail } from "./movies/MovieDetail"
import { FriendProvider } from "./friends/FriendProvider"

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
                        <Route exact path="/movies/detail/:movieId(\d+)">
                            <MovieDetail />
                        </Route>
                    </FriendProvider>
                </UserProvider>
            </MovieProvider>
            {/* Render the animal list when http://localhost:3000/animals */}
            {/* <Route path="/animals">
                <AnimalCard />
            </Route> */}
        </>
    )
}
