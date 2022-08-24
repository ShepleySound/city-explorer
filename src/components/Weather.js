import React from "react";

class Weather extends React.Component {

  render() {
    return (
      <div>
        <p>{this.props.weatherDate}</p>
        <p>{this.props.weatherDescription}</p>
      </div>
    )
  }
}

export default Weather;