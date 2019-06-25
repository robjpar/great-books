import axios from 'axios';

export default {
  searchForBooks: function(searchTerm) {
    const url = 'https://www.googleapis.com/books/v1/volumes';
    const params = {
      q: searchTerm,
      printType: 'books',
      projection: 'lite',
      maxResults: 20
    };
    return axios.get(url, { params: params });
  },
  saveBook: function(bookInfo) {
    return axios.post('api/books', bookInfo);
  },
  getSavedBooks: function() {
    return axios.get('/api/books');
  },
  deleteBook: function(bookId) {
    return axios.delete(`api/books/${bookId}`);
  }
};
