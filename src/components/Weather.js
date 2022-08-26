import React from "react";
import WeatherItem from "./WeatherItem";
class Weather extends React.Component {

  weatherItems = () => {
    return this.props.weatherData.map((day, i) => 
      <WeatherItem 
        key={i} 
        weatherData={day}/>
    )
  }

  render() {
    return (
      <div className="LocationData_weatherList">
        {this.weatherItems()}
      </div>
    )
  }
}

export default Weather;