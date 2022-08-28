import SearchForm from './components/SearchForm.js';
import LocationDataDisplay from './components/LocationDataDisplay';
import React from 'react';
import axios from 'axios';
import './App.css';
import Map from './components/Map.js';


class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      searchResult: null,
      searchQuery: '',
      thrownError: null,
      weatherForecast: null,
      isUpdating: true,
    }
  }

  async componentDidMount() {
    // Initialize location using Geolocation API.
    const initLocation = await this.getCurrentLocation();
    this.setState({
      lat: initLocation.coords.latitude ?? 70,
      lon: initLocation.coords.longitude ?? -40
    }, () => {

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

  queryBackLocation = () => {
    const baseUrl = `${process.env.REACT_APP_BACK_END_SERVER_URL}location`
    const params = {
      query: this.state.searchQuery
    }
    return axios.get(baseUrl, { params })
  }
  
  queryWeather = (location) => {
    const locationData = location.data
    const baseUrl = `${process.env.REACT_APP_BACK_END_SERVER_URL}weather`
    const params = {
      lat: locationData.lat,
      lon: locationData.lon,
    }
    return axios.get(baseUrl, { params });
  }

  queryMovie = (location) => {
    if (location.data.address.city) {
      const baseUrl = `${process.env.REACT_APP_BACK_END_SERVER_URL}movies`
      const params = {
        city: location.data.address.city,
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
      const locationResponse = await this.queryBackLocation();
      const weatherResponse = await this.queryWeather(locationResponse);
      const movieResponse = await this.queryMovie(locationResponse)
      this.setState({
        searchResult: locationResponse.data,
        thrownError: null,
        weatherForecast: weatherResponse.data,
        movieList: movieResponse?.data,
        lat: locationResponse.data.lat,
        lon: locationResponse.data.lon,
        isUpdating: true,
      }, () => {
        // this.handleFly()
      })
    } catch (error) {
      console.log(error)
      this.setState({
        thrownError: error,
      })
    }
  };

  toggleUpdating = (bool) => {
    this.setState({
      isUpdating: bool
    })
  }

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
        {this.state.lon && this.state.lat && 
          <Map lat={this.state.lat} lon={this.state.lon} isUpdating={this.state.isUpdating} toggleUpdating={this.toggleUpdating}/>
        }
        </main>
        <footer>
        </footer>
      </>
    );
  }
}
export default App;
