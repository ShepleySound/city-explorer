import logo from './map-icon.svg';
import './App.css';
import SearchForm from './SearchForm.js';
import LocationDataDisplay from './LocationDataDisplay';
import Image from 'react-bootstrap/Image';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: null,
      searchQuery: 'seattle',
      mapURL: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      searchQuery: e.target.value,
    });
  };

  handleSearch = async (e) => {
    console.log(window)
    e.preventDefault()
    try {
      const response = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.searchQuery}&format=json`)
      this.setState({
        locationData: response.data[0],
      })
    } catch (error) {
      console.log(error)
    }
  };
  render() {
    console.log(window.innerWidth, window.innerHeight)
    return (
      <>
        <header className="Header">
          <img src={logo} className="App-logo" alt="logo" />
          <SearchForm handleChange={this.handleChange} handleSearch={this.handleSearch}></SearchForm>
        </header>
        <main className='Main'>
          <Image
            fluid
            className="Main_mapImage" 
            src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.locationData?.lat},${this.state.locationData?.lon}&zoom=13`}
          />
          <LocationDataDisplay
            locationData={this.state.locationData}
          />
        </main>
        <footer>
  
        </footer>
      </>
    );
  }
}
export default App;
