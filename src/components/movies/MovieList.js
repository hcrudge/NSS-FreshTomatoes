import React, { useContext, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { MovieContext } from "./MovieProvider";
import { MovieCard } from "./MovieCard"
import "./Movie.css"

export const MovieList = () => {
    // This state changes when `getMovies` is invoked below
    const { movies, getMovies }  = useContext(MovieContext)

    const history = useHistory()

 //useEffect - reach out to the world for Movies
    useEffect(() => {
        console.log("MovieList: Initial render before data")
        getMovies()
    }, [])
// Creates the HTML to display the list of movies
return (
    <>
    <h2 className="MovieListHeader">Movie List</h2>
        <button onClick={() => {history.push("/movies/create")}}>
            Add Movie
        </button>
    <div className="movies">
            {/* map over array to display movie cards */}
        {movies.map(movie => {
        if(movie.userId === parseInt(sessionStorage.getItem("tomato_user")))
            return <MovieCard key={movie.id} movie={movie} />
        })
        }
    </div>
    </>
)

}
