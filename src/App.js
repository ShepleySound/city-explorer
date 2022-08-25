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

  handleChange = (e) => {
    this.setState({
      searchQuery: e.target.value,
    });
  };

  handleSearch = async (e) => {
    e.preventDefault()
    try {
      const locationResponse = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.searchQuery}&format=json&addressdetails=1&dedupe=1&normalizeaddress=1&normalizecity`);
      const weatherResponse = await axios.get(`${process.env.REACT_APP_BACK_END_SERVER_URL}weather?lat=${locationResponse.data[0].lat}&lon=${locationResponse.data[0].lon}`);
      const movieResponse = locationResponse.data[0].address.city && await axios.get(`${process.env.REACT_APP_BACK_END_SERVER_URL}movies?city=${locationResponse.data[0].address.city}`);
      console.log(locationResponse.data)
      console.log(movieResponse.data)
      this.setState({
        searchResult: locationResponse.data[0],
        thrownError: null,
        weatherForecast: weatherResponse.data,
        movieList: movieResponse.data
      })
    } catch (error) {
      this.setState({
        thrownError: error,
      })
    }
  };
  render() {
    return (
      <>
        <header className="Header">
          <img src={logo} className="App-logo" alt="logo" />
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
