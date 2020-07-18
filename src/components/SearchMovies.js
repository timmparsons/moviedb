import React, {useState} from 'react';
import MovieCard from './MovieCard';

const SearchMovies = () => {

  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();
    console.log("submitting");

    const url = `https://api.themoviedb.org/3/search/movie?api_key=d5826b4e12c757147537031e74238c63&language=en-US&query=${query}&page=1`

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data.results)
      setMovies(data.results)
    } catch(error) {
      console.log(error)
    }
  }

  
  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label htmlFor="query" className="label">Movie Name</label>
        <input className="input" type="text" name="query" 
          placeholder="Search for a movie.." 
          value={query} onChange={(e) => setQuery(e.target.value)}/>
        <button className="button" type="submit">Search</button>
      </form>
      <div className="card-list" >
        {movies.filter(movie => movie.poster_path).map(movie => (
          <MovieCard movie={movie} key={movie.id}/>
        ))}        
      </div>
    </>
  )
}

export default SearchMovies;