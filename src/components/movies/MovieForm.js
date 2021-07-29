import "./Movie.css"
import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { fetchMovie, MovieContext } from "./MovieProvider"
import { FriendContext } from "../friends/FriendProvider"


export const MovieForm =() => {
    const { getMovies, getMovieById} = useContext(MovieContext);
    const history = useHistory();
    const { movieId } = useParams()
    const { friends, getFriends } = useContext(FriendContext)
    
    const [ movie, setMovie ] = useState({
        TMDBId: 0,
        poster_path: "",
        title: "",
        runtime: 0,
        genres: [],
        synopsis: "",
        overview: "",
        tagline: "",
        userId: 0,
        friendId: 0,
        userRating: "",
        comments: ""
    });

    useEffect(() => {
        fetchMovie(movieId)
        .then((response) => {
            setMovie(response)
        })
        .then(getFriends)
    },[])

    useEffect(() =>{
        console.log(movie)
    },[movie])

   const handleControlledInputChange = event => {
       const newMovie ={ ...movie }
       newMovie[event.target.id] = event.target.value
   }
    const handleReturnMovieList = (event) => {
        event.preventDefault()
        history.push("/")
    }

    return(
    <section className="movie">
    <img className="movie_poster" src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="poster"/>
    <h3 className="movie__title">{ movie.title }</h3>
    <div className="movie__runtime">Runtime: { movie.runtime } minutes</div>
    <div className="movie_genre">Genre: { movie.genres[0]?.name }</div>
    <div className="movie_synposis">{ movie.overview.length>0 ? movie.overview : movie.synopsis }</div>
    {/* <div className="form-group">
          <label htmlFor="friend">Select Friend: </label>
          <select name="friendId" id="friendId" className="form-control" value={movie.friend?.friendName} onChange={handleControlledInputChange}>
            <option value="0">Select a friend</option>
            {friends.map(f => (
              <option key={f.id} value={f.id}>
                {f.friendName}
              </option>
            ))}
          </select>
        </div> */}
        <fieldset>
        <div className="form-group">
          <label htmlFor="movie_comments">Comments:</label>
          <textarea type="text" id="comments" required autoFocus className="form-control" placeholder="comments" value={movie.comments} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
    <button>Save</button>
    <button className="return_movieList" onClick={handleReturnMovieList}>Cancel</button>
    </section>   
    )
}