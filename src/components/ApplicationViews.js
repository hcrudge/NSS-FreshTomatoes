import React from "react"
import { Route } from "react-router-dom"



export const ApplicationViews = () => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <Route exact path="/">
                {/* < /> */}
            </Route>

            {/* Render the animal list when http://localhost:3000/animals */}
            {/* <Route path="/animals">
                <AnimalCard />
            </Route> */}
        </>
    )
}
