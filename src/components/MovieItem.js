import React from "react";
import Image from "react-bootstrap/Image"
import Carousel from "react-bootstrap/Carousel";


class MovieItem extends React.Component {

  render() {
    const { movieTitle, movieDescription, posterURL, ...rest } = this.props
    return (
      <Carousel.Item {...rest}>
          <Image className="Movie_image" src={this.props.posterURL}/>
          <Carousel.Caption className="Movie_caption">
            <h3 className="Movie_caption_title">{this.props.movieTitle}</h3>
            <p className="Movie_caption_description">{this.props.movieDescription}</p>
          </Carousel.Caption>
        </Carousel.Item>
    )
  }
}

export default MovieItem;