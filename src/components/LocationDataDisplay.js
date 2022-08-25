import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Carousel from "react-bootstrap/Carousel";
import Weather from "./Weather";
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
    console.log(this.props.movieData)
    return this.props.movieData.map((movieItem, i) => 
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
              <div className="LocationData_coordinates">
                {this.props.locationData?.lat}, {this.props.locationData?.lon}
              </div>
              {this.props.weatherData &&
              
              <ul className="LocationData_weatherList">
                {this.props.weatherData.map((day, i) => 
                  <Weather key={i} weatherDate={day.date} weatherDescription={day.description}/>
                )}
              </ul>
              }
              {this.props.movieData &&
              <Carousel className="Movie">
               {movieItems()}
              </Carousel>
              }
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      }
    </>
    )
  }
}

export default LocationDataDisplay;