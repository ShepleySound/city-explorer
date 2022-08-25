import React from "react";
import Card from "react-bootstrap/Card"
import Image from "react-bootstrap/Image"
import Carousel from "react-bootstrap/Carousel";


class Movie extends React.Component {

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

        // <Card className="MovieCard">
        //   <Card.Header>{this.props.movieTitle}</Card.Header>
        //   <Card.Body>
        //     <Image src={this.props.posterURL} height={300}/>
        //   </Card.Body>
        // </Card>
    )
  }
}

export default Movie;