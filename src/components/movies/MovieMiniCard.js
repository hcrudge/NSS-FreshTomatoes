import React from 'react';


export const MovieMiniCard = ({movie}) => {
 
const imageURL = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
  return (
    <>
      <div className="mini_movie_container">
          <img className="miniMoviePoster" src={imageURL} alt={movie.title} /> 
          <h3 className="miniMovieTitle">{movie.title}</h3>
      </div>

    </>
  );
}