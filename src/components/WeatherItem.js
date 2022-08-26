import React from "react";
import Card from "react-bootstrap/Card"
import rainDrop from "../assets/rain-drop.svg"

class WeatherItem extends React.Component {
  render() {
    const dateNum = this.props.weatherData.date.split('-')[2]
    const iconPath = `/weather-icons/${this.props.weatherData.icon}.png`
    return (
        <Card className="WeatherCard" border="light">
          <Card.Header>{dateNum}</Card.Header>
          <Card.Body>
            <img src={iconPath} alt="Weather Icon" width={40}></img>
            <div className="WeatherCard_popContainer">
              <img className="WeatherCard_popIcon" src={rainDrop} alt="Rain Icon" width={16}></img>
              <p className="WeatherCard_popValue">{this.props.weatherData.pop}%</p>
            </div>
          </Card.Body>
        </Card>
    )
  }
}

export default WeatherItem;