import React, { Component } from 'react';
import Api from '../../utils/Api';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import Media from 'react-bootstrap/Media';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default class Saved extends Component {
  state = {
    savedBooks: [],
    errorMessage: ''
  };

  componentDidMount() {
    this.getSavedBooks();
  }

  getSavedBooks = () => {
    Api.getSavedBooks()
      .then(res => {
        if (res.data.length === 0)
          return this.setState({ errorMessage: 'No saved books.' });
        this.setState({ savedBooks: res.data, errorMessage: '' });
      })
      .catch(err => this.setState({ errorMessage: err.message }));
  };

  deleteBook = bookId => {
    Api.deleteBook(bookId)
      .then(res => {
        this.setState({ errorMessage: '' });
        this.getSavedBooks();
      })
      .catch(err => this.setState({ errorMessage: err.message }));
  };

  render() {
    const handleDismiss = () => this.setState({ errorMessage: '' });
    return (
      <Container>
        <Alert
          variant="danger"
          show={this.state.errorMessage ? true : false}
          dismissible
          onClose={handleDismiss}
        >
          {this.state.errorMessage}
        </Alert>
        <ListGroup>
          {this.state.savedBooks.map(book => (
            <ListGroup.Item key={book._id}>
              <Media>
                <img
                  width={128}
                  className="align-self-start mr-3"
                  src={book.thumbnail}
                  alt={book._id}
                />
                <Media.Body className="mr-3">
                  <h4>{book.title ? book.title : ''}</h4>
                  <h5>{book.authors ? 'by ' + book.authors.join(', ') : ''}</h5>
                  <p>{book.description ? book.description : ''}</p>
                </Media.Body>
                <ButtonGroup vertical>
                  <Button
                    variant="outline-info"
                    href={book.infoLink}
                    target="_blank"
                  >
                    More Info
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => this.deleteBook(book._id)}
                  >
                    Delete
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
