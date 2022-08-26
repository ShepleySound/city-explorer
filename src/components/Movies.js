import React from "react";
import Carousel from "react-bootstrap/Carousel";
import MovieItem from "./MovieItem";


class Movies extends React.Component {

  movieItems = () => {
    return this.props.movieData?.map((movieItem, i) => 
    <MovieItem 
      key={i} 
      movieTitle={movieItem.title} 
      movieDescription={movieItem.description} 
      posterURL={movieItem.poster_url ?? "/movie-placeholder-780x439.png"}/>
    )
  }

  render() {
    return (
      <Carousel className="Movie">
        {this.movieItems()}
      </Carousel>
    )
  }
}

export default Movies;