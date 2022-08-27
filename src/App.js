import SearchForm from './components/SearchForm.js';
import LocationDataDisplay from './components/LocationDataDisplay';
import React from 'react';
import axios from 'axios';
import mapboxgl from '!mapbox-gl'; //eslint-disable-line import/no-webpack-loader-syntax
import './App.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 12,
      searchResult: null,
      searchQuery: '',
      thrownError: null,
      weatherForecast: null,
    }
    this.mapContainer = React.createRef();

  }

  // Initialize location using Geolocation API.
  async componentDidMount() {
    const initLocation = await this.getCurrentLocation();
    this.setState({
      lat: initLocation.coords.latitude ?? 70,
      lon: initLocation.coords.longitude ?? -40
    }, () => {
      const { lat, lon, zoom } = this.state;
      const map = new mapboxgl.Map({
        container: this.mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lon, lat],
        zoom: zoom
      });
      map.addControl(new
        mapboxgl.GeolocateControl())
      map.addControl(new
        mapboxgl.NavigationControl())
      this.setState({
        map: map
      })
    })
  }

  flyToLocation() {
    this.state.map.flyTo({
      center: [this.state.lon, this.state.lat],
      zoom: 12
    })
  }

  // Wrap Geolocation API object in a promise.
  getCurrentLocation = () => {
    return new Promise((resolve, reject) => 
      navigator.geolocation.getCurrentPosition(resolve, reject)
    )
  }

  queryLocation = () => {
    const baseUrl = 'https://us1.locationiq.com/v1/search'
    const params = {
      key: process.env.REACT_APP_LOCATIONIQ_API_KEY,
      q: this.state.searchQuery,
      format: 'json',
      addressdetails: 1,
      dedupe: 1,
      normalizeaddress: 1,
      normalizecity: 1,
    }
    return axios.get(baseUrl, { params })
  }
  
  queryWeather = (location) => {
    const locationData = location.data[0]
    const baseUrl = `${process.env.REACT_APP_BACK_END_SERVER_URL}weather`
    const params = {
      lat: locationData.lat,
      lon: locationData.lon,
    }
    return axios.get(baseUrl, { params });
  }

  queryMovie = (location) => {
    if (location.data[0].address.city) {
      const baseUrl = `${process.env.REACT_APP_BACK_END_SERVER_URL}movies`
      const params = {
        city: location.data[0].address.city,
      }
      return axios.get(baseUrl, { params });
    } else return;
  }

  handleChange = (e) => {
    this.setState({
      searchQuery: e.target.value,
    });
  };

  handleSearch = async (e) => {
    e.preventDefault()
    try {
      const locationResponse = await this.queryLocation();
      const weatherResponse = await this.queryWeather(locationResponse);
      const movieResponse = await this.queryMovie(locationResponse)
      this.setState({
        searchResult: locationResponse.data[0],
        thrownError: null,
        weatherForecast: weatherResponse.data,
        movieList: movieResponse?.data,
        lat: locationResponse.data[0].lat,
        lon: locationResponse.data[0].lon,
      }, () => {
        this.flyToLocation();
      })
    } catch (error) {
      console.log(error)
      this.setState({
        thrownError: error,
      })
    }
  };
  render() {
    
    return (
      <>
        <header className="Header">
          <SearchForm thrownError={this.state.thrownError} handleChange={this.handleChange} handleSearch={this.handleSearch}></SearchForm>
        </header>
        <main className='Main'>
        { !this.state.thrownError && this.state.searchResult &&
          <>
            <LocationDataDisplay
              locationData={this.state.searchResult}
              weatherData={this.state.weatherForecast}
              movieData={this.state.movieList}
            />
        </>
        }
        <div ref={this.mapContainer}
            className="mapContainer" />
        </main>
        <footer>
        </footer>
      </>
    );
  }
}
export default App;
