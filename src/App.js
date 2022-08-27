import logo from './assets/map-icon.svg';
import SearchForm from './components/SearchForm.js';
import LocationDataDisplay from './components/LocationDataDisplay';
import Image from 'react-bootstrap/Image';
import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: null,
      searchQuery: '',
      thrownError: null,
      weatherForecast: null,
    }
  }

  // FRONT-END LOCATION QUERYING. 
  // REPLACED BY SERVER-SIDE QUERYING.
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
    const baseUrl = `${process.env.REACT_APP_BACK_END_SERVER_URL}weather`
    const params = {
      lat: location.data.lat,
      lon: location.data.lon,
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
      const movieResponse = await this.queryMovie(locationResponse);
      this.setState({
        searchResult: locationResponse.data,
        thrownError: null,
        weatherForecast: weatherResponse.data,
        movieList: movieResponse?.data,
        lat: locationResponse.data.lat,
        lon: locationResponse.data.lon,
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
          <img src={logo} className="App-logo" alt="logo" width={100} height={100} />
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
            <picture className="MapSlot">
              <source media="(max-width: 799px)" srcSet={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.searchResult?.lat},${this.state.searchResult?.lon}&zoom=13&size=600x1200`}/>
              <source media="(min-width: 800px)" srcSet={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.searchResult?.lat},${this.state.searchResult?.lon}&zoom=13&size=1920x1080`}/>
              <Image className='MapSlot_image' src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.searchResult?.lat},${this.state.searchResult?.lon}&zoom=13&size=480x480`} alt="Map"/>
            </picture>
        </>
        }
        </main>
        <footer>
        </footer>
      </>
    );
  }
}
export default App;
