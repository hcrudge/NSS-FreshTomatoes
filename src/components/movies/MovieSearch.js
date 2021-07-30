import "./Movie.css"
import React, { useState, useRef } from "react"
import { searchMovie } from "./MovieProvider"
import { MovieMiniCard } from "./MovieMiniCard"


export const FindMovie = () => {
    const [ movies, setMovies ] = useState([]);
    const searchInput = useRef("");


    const handleSearch = () => {
            console.log(searchInput.current.value)
        const searchedMovie = searchInput.current.value
            if (searchedMovie === "") {
			    window.alert("Please Search For a Movie Title")
		    } else {
                searchMovie(searchedMovie)
                .then(response => {
                    console.log(response.results)
                    setMovies(response.results)
                })
		    }
    }
    return (
        <>
            <div className= "movie-search">
                <h1 className="search_movie_lable">Search For A Movie</h1>
                    <input ref={searchInput} type="text" required autofocus className="form-control-search"></input>
                <br />
                <br />
                <div className= "button_div">
                    <button className="search_button" onClick={handleSearch} >SEARCH</button>
                </div>
                <div>
                    {movies.map(m => (
                        <MovieMiniCard key={m.id} movie={m} />
                    ))}
                </div>
            </div>
        </>
    )
}

