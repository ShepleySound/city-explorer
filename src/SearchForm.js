import React from "react";
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import searchIcon from './search-icon.svg'

class SearchForm extends React.Component {
  render() {
    return (
      <Form className="SearchForm">
        <InputGroup>
        <Form.Control
          placeholder="Enter Location..."
        />
        <Button onClick={this.props.handleSearch} variant="outline-secondary"><img src={searchIcon} alt="Search" width='20'/></Button>
        </InputGroup>
      </Form>

    )
  }
}

export default SearchForm;