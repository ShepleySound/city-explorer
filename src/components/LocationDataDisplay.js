import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Weather from "./Weather";

class LocationDataDisplay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      eventKey: 0,
    }
  }
  handleClick = () => {
    this.setState(state => {
      return {eventKey: state.eventKey ? 0 : 1 }
    });
  }

  createWeather = () => {
    this.props.weatherData.map((day, i) => {
      <Weather key={i} weatherDate={day.date} weatherDescription={day.description}/>
    })
  }
  
  render() {
  

    return (
      <>
      {/* Only render if locationData exists */}
      { this.props.locationData &&
      <div className="LocationData">
        <Accordion flush activeKey={this.state.eventKey} className="LocationData text-center" placement="bottom">
          <Accordion.Item eventKey={0}>
            <Accordion.Header onClick={this.handleClick} className="LocationData_header active">
            { this.props.locationData?.display_name } 
            </Accordion.Header>
            <Accordion.Body>
              {this.props.locationData?.lat}, {this.props.locationData?.lon}
              {this.props.weatherData &&
              <ul>
                {this.props.weatherData.map((day, i) => 
                  <Weather key={i} weatherDate={day.date} weatherDescription={day.description}/>
                  )}
              </ul>
              }
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      }
    </>
    )
  }
}

export default LocationDataDisplay;