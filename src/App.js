import logo from './map-icon.svg';
import './App.css';
import SearchForm from './SearchForm.js'
import React from 'react';
import axios, { Axios } from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationResult: null,
    }
  }
  async handleSearch() {
    try {
      const response = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=seattle&format=json`)
      console.log(response)
      this.setState({
        locationResult: response
      })
    } catch (error) {
      console.log(error)
    }

  }
  render() {
    return (
      <>
        <header className="Header">
          <img src={logo} className="App-logo" alt="logo" />
          <SearchForm handleSearch={this.handleSearch}></SearchForm>
  
        </header>
        <main>
        </main>
        <footer>
  
        </footer>
      </>
    );
  }
}
export default App;
