import React from "react"
import { Route } from "react-router-dom"
import { MovieList } from "./movies/MovieList"
import { MovieProvider } from "./movies/MovieProvider"
import { UserProvider } from "./users/UserProvider"


export const ApplicationViews = () => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <MovieProvider>
                <UserProvider>
                    <Route exact path="/">
                        <MovieList />
                    </Route>
                </UserProvider>
            </MovieProvider>
            {/* Render the animal list when http://localhost:3000/animals */}
            {/* <Route path="/animals">
                <AnimalCard />
            </Route> */}
        </>
    )
}
