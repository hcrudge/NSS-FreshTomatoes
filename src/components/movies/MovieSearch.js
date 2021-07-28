import "./Movie.css"
import React, { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { searchMovie } from "./MovieProvider"
import { MovieMiniCard } from "./MovieMiniCard"

export const FindMovie = () => {
    const [ movies, setMovies ] = useState([]);
    const { movieId } = useParams();
    const searchInput = useRef("");


    const handleSearch = () => {
            console.log(searchInput.current.value)
        const searchedMovie = searchInput.current.value
            if (searchedMovie === "") {
			    window.alert("Please Search For a Movie Title")
		    } else {
                searchMovie(searchedMovie)
                .then(res => {
                    console.log(res.results)
                    setMovies(res.results)
                })
		    }
    }
    return (
        <>
            <div className= "movie-search">
                <h1 className="search_movie_lable">Search For A Movie</h1>
                    <input ref={searchInput} type="text" className="form-control-search"></input>
                <div className= "button_div">
                    <button className="search_button" onClick={handleSearch} >SEARCH!</button>
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
