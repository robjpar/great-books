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
  }
};
