import React, { useContext, useEffect, useState } from  "react"
import { MovieContext } from "./MovieProvider"
import { useParams,useHistory } from "react-router-dom"


export const MovieDetail = () => {
    const { getMovieById } = useContext(MovieContext)
    const [movie, setMovie] = useState({})
    const history = useHistory();
    const {movieId} = useParams();

    useEffect(() => {
        console.log("useEffect" , movieId )
        getMovieById(movieId)
        .then((response) => {
            setMovie(response)
        })
    },[])

    const handleReturnMovieList = (event) => {
        event.preventDefault()
        history.push("/")
    }

    return(
    <section className="movie">
    <img className="movie_poster" src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="poster"/>
    <h3 className="movie__title">{ movie.title }</h3>
    <div className="movie__runtime">Runtime: { movie.runtime } minutes</div>
    <div className="movie_genre">Genre: { movie.genre }</div>
    <div className="movie_synposis">{ movie.synopsis }</div>
    <div className="movie_friend">Recommended By: {movie.friend?.friendName} </div>
    <div className="movie_comments">Comments: {movie.comments}</div>
    <button>Edit</button>
    <button>Delete</button>
    <br/>
    <button className="return_movieList" onClick={handleReturnMovieList}>Return to Movie List</button>
    </section>   
    )
}