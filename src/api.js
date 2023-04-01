import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const fetchImagesWithQuery = async (searchQuery, page) => {
  const response = await axios.get(`/?q=${searchQuery}&page=${page}`, {
    params: {
      key: '1600525-016427548b1ce21d96fbba306',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 12,
    },
  });
  return response.data.hits;
};

const getData = {
  fetchImagesWithQuery,
};

export default getData;
