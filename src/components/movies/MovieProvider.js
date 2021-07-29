import React, { useState, createContext} from "react";

// The context is imported and used by individual components that need data
export const MovieContext = createContext()

// This component establishes what data can be used.
export const MovieProvider = (props) => {
    const [movies, setMovies] = useState([]);
    // const [movie, setMovie] = useState({});

    const getMovies = () => {
        return fetch("http://localhost:8088/movies")
        .then(res => res.json())
        .then(setMovies);
    }
    // fetch the detail for a particular movie.
    const getMovieById = (id) => {
        return fetch(`http://localhost:8088/movies/${id}?_expand=user&_expand=friend`)
        .then(response => response.json())
    };
    
    const addMovie = (movieObject) => {
        return fetch("http://localhost:8088/movies",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movieObject)
        })
        .then(response => response.json())
        .then(getMovies)
    }



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
           movies, getMovies, getMovieById, deleteMovie, addMovie
        }}>
                {props.children}
            </MovieContext.Provider>
        )
    }


    // Reach out to the TMDB API 
    export const searchMovie = (term) => {
        return fetch(`https://api.themoviedb.org/3/search/movie?api_key=c4e5719c7e8a0eddc452fe601c001d80&language=en-US&query=${term}&page=1&include_adult=false`)
        .then(result => result.json())
    };
    export const fetchMovie = (id) => {
            return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=c4e5719c7e8a0eddc452fe601c001d80`)
            .then(response => response.json())
        }