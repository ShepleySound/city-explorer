import React from "react";
import mapboxgl from '!mapbox-gl'; //eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;


class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 12,
    }
    this.mapContainer = React.createRef();
  }

  
  componentDidMount() {
    const { lat, lon} = this.props;
    const { zoom } = this.state;
    // Build map using Mapbox GL JS
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lon, lat],
      zoom: zoom
    });
    // Flies to user's current location
    map.addControl(new
      mapboxgl.GeolocateControl())
    // Allows user to zoom and rotate map using buttons
    map.addControl(new
      mapboxgl.NavigationControl())
    this.setState({
      map: map
    })
  }

  handleFly = () => {
    this.state.map.flyTo({
      center: [this.props.lon, this.props.lat],
      zoom: 12
    })
    this.props.toggleUpdating(false)
  }
    
  
  
  render() {
    if (this.state.map && this.props.isUpdating) {
      this.handleFly()
    }
    
    return (
      <div ref={this.mapContainer}
            className="mapContainer" handleFly/>
    )
  }
}
export default Map;