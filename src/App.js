import logo from './map-icon.svg';
import './App.css';
import SearchForm from './SearchForm.js'
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationResult: null,
      searchQuery: null,
    }
  }

  handleChange = (e) => {
    this.setState({
      searchQuery: '',
    });
  };
  handleSearch = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=seattle&format=json`)
      this.setState({
        locationResult: response.data[0]
      })
    } catch (error) {
      console.log(error)
    }

  }
  render() {
    console.log(this.state.locationResult)
    return (
      <>
        <header className="Header">
          <img src={logo} className="App-logo" alt="logo" />
          <SearchForm handleChange={this.handleChange} handleSearch={this.handleSearch}></SearchForm>
        </header>
        <main>
          <p>{this.state.locationResult?.display_name}</p>
          <p>{this.state.locationResult?.lat}</p>
          <p>{this.state.locationResult?.lon}</p>
        </main>
        <footer>
  
        </footer>
      </>
    );
  }
}
export default App;
