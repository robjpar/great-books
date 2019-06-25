import React, { Component } from 'react';
import Api from '../../utils/Api';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import Media from 'react-bootstrap/Media';

export default class Search extends Component {
  state = { searchTerm: '', searchResults: [], errorMessage: '' };

  componentDidMount() {
    this.searchInput.focus();
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (!this.state.searchTerm)
      return this.setState({ errorMessage: 'Search term required' });
    Api.searchForBooks(this.state.searchTerm)
      .then(res => {
        this.setState({ searchResults: res.data.items, errorMessage: '' });
      })
      .catch(err =>
        this.setState({ errorMessage: err.response.data.error.message })
      );
  };

  render() {
    const handleDismiss = () => this.setState({ errorMessage: '' });
    return (
      <Container>
        <Form onSubmit={this.handleFormSubmit}>
          <InputGroup className="mb-3" size="lg">
            <Form.Control
              type="text"
              name="searchTerm"
              placeholder="search term"
              isValid={this.state.searchTerm.length}
              onChange={this.handleInputChange}
              ref={input => (this.searchInput = input)}
            />
            <InputGroup.Append>
              <Button variant="outline-primary" type="submit">
                Search
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
        <Alert
          variant="danger"
          show={this.state.errorMessage ? true : false}
          dismissible
          onClose={handleDismiss}
        >
          There was a problem: {this.state.errorMessage}
        </Alert>
        <ListGroup>
          {this.state.searchResults.map(result => (
            <ListGroup.Item key={result.id}>
              <Media>
                <img
                  width={128}
                  className="align-self-start mr-3"
                  src={result.volumeInfo.imageLinks.thumbnail}
                  alt={result.id}
                />
                <Media.Body>
                  <h4>
                    {result.volumeInfo.title ? result.volumeInfo.title : ''}
                  </h4>
                  <h5>
                    {result.volumeInfo.authors
                      ? 'by ' + result.volumeInfo.authors.join(', ')
                      : ''}
                  </h5>
                  <p>
                    {result.volumeInfo.description
                      ? result.volumeInfo.description
                      : ''}
                  </p>
                </Media.Body>
              </Media>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    );
  }
}
