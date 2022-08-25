import React from "react";
import Card from "react-bootstrap/Card"
import Image from "react-bootstrap/Image"

class Movie extends React.Component {

  render() {
    return (
        <Card className="MovieCard">
          <Card.Header>{this.props.movieTitle}</Card.Header>
          <Card.Body>
            <Image src={this.props.posterURL} height={300}/>
          </Card.Body>
        </Card>
    )
  }
}

export default Movie;