import React, { useState, createContext} from "react";

// The context is imported and used by individual components that need data
export const MovieContext = createContext()

// This component establishes what data can be used.
export const MovieProvider = (props) => {
    const [movies, setMovies] = useState([])

    const getMovies = () => {
        return fetch("http://localhost:8088/movieLists")
        .then(res => res.json())
        .then(setMovies)
    }





    /*
        A context provider is returned which contains the 
        `movies` state, `getMovies` function,
        and the `addMovie` function as keys. This
        allows any child elements to access them.
    */
        return (
            <MovieContext.Provider value={{
                movies, getMovies
            }}>
                {props.children}
            </MovieContext.Provider>
        )
}