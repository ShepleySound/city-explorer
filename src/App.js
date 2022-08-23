import logo from './map-icon.svg';
import './App.css';
import SearchForm from './SearchForm.js'
import React from 'react';

class App extends React.Component {

  handleSearch() {
    console.log("Hello!")
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
