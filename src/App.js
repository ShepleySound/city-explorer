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
      const response = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.searchQuery}&format=json&addressdetails=1`)
      this.setState({
        searchResult: response.data[0],
        thrownError: null,
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
            />
            <picture className="MapSlot">
              <source media="(max-width: 600px)" srcSet={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.searchResult?.lat},${this.state.searchResult?.lon}&zoom=13&size=600x1200`}/>
              <source media="(min-width: 800px)" srcSet={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.searchResult?.lat},${this.state.searchResult?.lon}&zoom=13&size=1920x1080`}/>
              <Image className='MapSlot_image' src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.searchResult?.lat},${this.state.searchResult?.lon}&zoom=13&size=480x480`} alt="Map"/>
            </picture>
            {/* <Image
              fluid
              className="Main_mapImage" 
              srcSet=
              {`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.searchResult?.lat},${this.state.searchResult?.lon}&zoom=13&size=300x300 300w,
              https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.searchResult?.lat},${this.state.searchResult?.lon}&zoom=13&size=1200x800 1200w`}
              sizes="(max-width: 600px) 300px,
                     1200px"
            /> */}
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
