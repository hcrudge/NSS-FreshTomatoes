import "./Movie.css"
import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { MovieContext } from "./MovieProvider"
import { FindMovie } from "./MovieSearch"

export const MovieForm =() => {
    const { searchMovie, getMovies, getMovieById } = useContext(MovieContext);
    const history = useHistory();
    const { movieId } = useParams()

    const [movie, setMovie ] = useState({
        TMDId: 0,
        poster_path: "",
        title: "",
        runtime: 0,
        genre: "",
        synopsis: "",
        tagline: "",
        userId: 0,
        friendId: 0,
        userRating: "",
        comments: ""
    });
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    getMovies()
    .then(() =>{
        if(movieId){
            getMovieById(movieId)
            .then(movie => {
                setMovie(movie)
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
            }
    })
},[])

return(FindMovie())


}
