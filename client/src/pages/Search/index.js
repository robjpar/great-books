import React, { Component } from 'react';
import Api from '../../utils/Api';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import Media from 'react-bootstrap/Media';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default class Search extends Component {
  state = {
    searchTerm: '',
    searchResults: [],
    errorMessage: '',
    savedIds: {}
  };

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

  saveBook = searchResult => {
    const bookInfo = {
      id: searchResult.id,
      title: searchResult.volumeInfo.title,
      authors: searchResult.volumeInfo.authors,
      description: searchResult.volumeInfo.description,
      thumbnail: searchResult.volumeInfo.imageLinks.thumbnail,
      infoLink: searchResult.volumeInfo.infoLink,
      date: Date.now()
    };
    Api.saveBook(bookInfo)
      .then(res => {
        const savedIds = this.state.savedIds;
        savedIds[res.data.id] = true;
        this.setState({ savedIds });
      })
      .catch(err => this.setState({ errorMessage: err.message }));
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
          {this.state.errorMessage}
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
                <Media.Body className="mr-3">
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
                <ButtonGroup vertical>
                  <Button
                    variant="outline-info"
                    href={result.volumeInfo.infoLink}
                    target="_blank"
                  >
                    More Info
                  </Button>
                  <Button
                    variant="outline-warning"
                    onClick={() => this.saveBook(result)}
                    disabled={this.state.savedIds[result.id] ? true : false}
                  >
                    {this.state.savedIds[result.id] ? 'Saved' : 'Save'}
                  </Button>
                </ButtonGroup>
              </Media>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    );
  }
}
