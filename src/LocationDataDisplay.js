import React from "react";
import Card from "react-bootstrap/Card";

class LocationDataDisplay extends React.Component {
  render() {
    return (
      <>
      {/* Only render if locationData exists */}
      { this.props.locationData &&
      <div>
        <Card className="text-center">
          <Card.Header>Location</Card.Header>
          <Card.Body>{this.props.locationData?.display_name}</Card.Body>
        </Card>
        <Card className="text-center">
          <Card.Header>Coordinates</Card.Header>
          <Card.Body>{this.props.locationData?.lat}, {this.props.locationData?.lon}</Card.Body>
        </Card>
      </div>
      }
    </>
    )
  }
}

export default LocationDataDisplay;