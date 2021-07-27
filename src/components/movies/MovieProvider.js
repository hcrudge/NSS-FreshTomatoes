import React, { useState, createContext} from "react";

// The context is imported and used by individual components that need data
export const MovieContext = createContext()

// This component establishes what data can be used.
export const MovieProvider = (props) => {
    const [movies, setMovies] = useState([]);

    const getMovies = () => {
        return fetch("http://localhost:8088/movies?_expand=user&_expand=friend")
        .then(res => res.json())
        .then(setMovies);
    }
// fetch the detail for a particular movie.
    const getMovieById = (id) => {
        return fetch(`http://localhost:8088/movies/${id}?_expand=user&_expand=friend`)
        .then(response => response.json())
    };

// delete movie from the JSON server by id
const deleteMovie = (movieId) => {
    return fetch (`http://localhost:8088/movies/${movieId}`,{
        method: "DELETE"
    })
    .then(getMovies)
}


    /*
        A context provider is returned which contains the 
        `movies` state, `getMovies` function,
        and the `addMovie` function as keys. This
        allows any child elements to access them.
    */
        return (
            <MovieContext.Provider value={{
                movies, getMovies, getMovieById, deleteMovie
            }}>
                {props.children}
            </MovieContext.Provider>
        )
}