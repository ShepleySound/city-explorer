import React from "react";
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import searchIcon from '../assets/search-icon.svg'

class SearchForm extends React.Component {

  render() {
    return (
      <Form onSubmit={this.props.handleSearch} className="SearchForm">
        <InputGroup className="position-relative">
        <Form.Control
          onChange={this.props.handleChange}
          placeholder="Enter Location..."
        />
        <Button type="submit" variant="light"><img src={searchIcon} alt="Search" width='20'/></Button>
        </InputGroup>
        {this.props.thrownError &&
          <Alert variant={"danger"} className="position-absolute opacity-75">{this.props.thrownError?.message}</Alert>
        }
      </Form>

    )
  }
}

export default SearchForm;