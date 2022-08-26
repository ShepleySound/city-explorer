import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Carousel from "react-bootstrap/Carousel";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import Weather from "./Weather"
import WeatherItem from "./WeatherItem";
import Movie from "./Movie";
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
  
  render() {
  
  const movieItems = () => {
    return this.props.movieData?.map((movieItem, i) => 
        <Movie key={i} movieTitle={movieItem.title} movieDescription={movieItem.description} posterURL={movieItem.poster_url ?? "/movie-placeholder-780x439.png"}/>
    )
  }

    return (
      <>
      {/* Only render if locationData exists */}
      { this.props.locationData &&
        <Accordion flush activeKey={this.state.eventKey} className="LocationData text-center" placement="bottom">
          <Accordion.Item eventKey={0}>
            <Accordion.Header onClick={this.handleClick} className="LocationData_header active">
            { this.props.locationData?.display_name } 
            </Accordion.Header>
            <Accordion.Body className="LocationBody">
              <Tabs
                defaultActiveKey={"weather"}
                id="location-data"
              >
                <Tab eventKey="weather" title="Weather" disabled={!this.props.weatherData}>
                  
                  <Weather weatherData={this.props.weatherData}/>

                </Tab>
                <Tab eventKey="movies" title="Movies" disabled={!this.props.movieData}>
                <Carousel className="Movie">
                  {movieItems()}
                </Carousel>
                </Tab>
              </Tabs>

            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      }
    </>
    )
  }
}

export default LocationDataDisplay;