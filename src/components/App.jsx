import React, { Component } from 'react';
import getData from './../api';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { Notify } from 'notiflix';

class App extends Component {
  state = {
    photos: [],
    searchQuery: '',
    lastQuery: '',
    isLoading: false,
    error: null,
    page: 1,
    showModal: false,
    modalPhoto: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.getImages(searchQuery, page);
    }
  }

  handleSearch = searchQuery => {
    if (searchQuery === '') {
      Notify.info('Please enter a search phrase.');
    }
    if (searchQuery !== this.state.lastQuery) {
      this.setState({
        photos: [],
        searchQuery,
        page: 1,
        lastQuery: searchQuery,
      });
    }
  };

  getImages = async () => {
    const { searchQuery, page } = this.state;
    this.setState({ isLoading: true });
    try {
      const photos = await getData.fetchImagesWithQuery(searchQuery, page);
      this.setState(prevState => ({
        photos: [...prevState.photos, ...photos],
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMore = () => {
    this.setState({ page: this.state.page + 1 });
  };

  handlePhotoClick = photo => {
    this.setState({
      showModal: true,
      modalPhoto: photo,
    });
  };

  handleModalClose = () => {
    this.setState({
      showModal: false,
      modalPhoto: '',
    });
  };

  render() {
    const { photos, isLoading, showModal, modalPhoto } = this.state;
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery photos={photos} onClick={this.handlePhotoClick} />
        {isLoading && <Loader />}
        {photos.length > 0 && <Button onClick={this.handleLoadMore} />}
        {showModal && (
          <Modal photo={modalPhoto} onClick={this.handleModalClose} />
        )}
      </div>
    );
  }
}

export default App;
