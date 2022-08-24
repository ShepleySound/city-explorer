import React from "react";
import Card from "react-bootstrap/Card"

class Weather extends React.Component {

  render() {
    return (
        <Card className="WeatherCard">
          <Card.Header>{this.props.weatherDate}</Card.Header>
          <Card.Body>{this.props.weatherDescription}</Card.Body>
        </Card>
    )
  }
}

export default Weather;