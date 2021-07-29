import "./Movie.css"
import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { fetchMovie, MovieContext } from "./MovieProvider"
import { FriendContext } from "../friends/FriendProvider"


export const MovieForm =() => {
    const { getMovies, getMovieById, addMovie} = useContext(MovieContext);
    const history = useHistory();
    const { movieId } = useParams()
    const { friends, getFriends } = useContext(FriendContext)
    
    const [ movie, setMovie ] = useState({
        TMDBId: 0,
        poster_path: "",
        title: "",
        runtime: 0,
        genres: [],
        overview: "",
        tagline: "",
        userId: 0,
        friendId: 0,
        userRating: "",
        comments: ""
    });

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchMovie(movieId)
        .then((response) => {
            setMovie(response)
            setIsLoading(false)
        })
        .then(getFriends)
    },[])

    useEffect(() =>{
        console.log(movie)
    },[movie])

   const saveNewMovie = () => {
       const userId = parseInt(sessionStorage.getItem("tomato_user"))       
       const addNewMovie = {
        TMDBId: parseInt(movieId),
        poster_path: movie.poster_path,
        title: movie.title,
        runtime: movie.runtime,
        genres: movie.genres[0].name,
        overview: movie.overview,
        tagline: movie.tagline,
        userId: userId,
        friendId: parseInt(movie.friendId),
        userRating: "",
        comments: movie.comments 
       }
       addMovie(addNewMovie)
       .then(() => history.push("/"))
       console.log(movie.friendId)
   }
   
   
    const handleControlledInputChange = event => {
       const newMovie ={ ...movie }
       newMovie[event.target.id] = event.target.value
       setMovie(newMovie)
   }
    const handleReturnMovieList = (event) => {
        event.preventDefault()
        history.push("/")
    }

    const handleClickSaveMovie = (event) => {
        event.preventDefault()
        if (movie.friendId === 0){
            window.alert("Please select a friend")
        }else {
            setIsLoading(true);

            saveNewMovie()
        }  
    }

    return(
    <section className="movie">
    <img className="movie_poster" src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="poster"/>
    <h3 className="movie__title">{ movie.title }</h3>
    <div className="movie__runtime">Runtime: { movie.runtime } minutes</div>
    <div className="movie_genre">Genre: { movie.genres[0]?.name }</div>
    <div className="movie_synposis">{ movie.overview }</div>
    <br/>
    <div className="form-group">
          <label htmlFor="friend">Select Friend: </label>
          <select name="friendId" id="friendId" className="form-control" value={movie.friendId} onChange={handleControlledInputChange}>
            <option value="0">Select a friend</option>
            {friends.map(friend => (
              <option key={friend.id} value={friend.id}>
                {friend.friendName}
              </option>
            ))}
          </select>
        </div>
        <fieldset>
        <div className="form-group">
          <label htmlFor="movie_comments">Comments:</label>
          <textarea type="text" id="comments" required autoFocus className="form-control" placeholder="comments" value={movie.comments} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
    <button className="add_movie_button" onClick={handleClickSaveMovie}>Save</button>
    <button className="return_movieList" onClick={handleReturnMovieList}>Cancel</button>
    </section>   
    )
}