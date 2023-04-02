import React, { useState, useEffect } from 'react';
import getData from './../api';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { Notify } from 'notiflix';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState({
    showModal: false,
    modalPhoto: '',
  });

  const onSubmit = event => {
    event.preventDefault();
    let searchValue = event.target.search.value.trim().toLowerCase();
    if (searchValue === '') {
      return Notify.info('Please enter a search phrase.');
    }
    if (searchValue === searchQuery) {
      return Notify.info('You are searching the same phrase! Enter new one');
    }
    setSearchQuery(searchValue);
    setIsLoading(true);
    setPhotos([]);
    setPage(1);
  };

  useEffect(() => {
    const getImages = async () => {
      setIsLoading(true);
      try {
        const photos = await getData.fetchImagesWithQuery(searchQuery, page);
        setPhotos(prevState => [...prevState, ...photos]);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery) {
      getImages(searchQuery, page);
    }
  }, [searchQuery, page]);

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handlePhotoClick = photo => {
    setModal({
      showModal: true,
      modalPhoto: photo,
    });
  };

  const handleModalClose = () => {
    setModal({
      showModal: false,
      modalPhoto: '',
    });
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery photos={photos} onClick={handlePhotoClick} />
      {error && <p>An error occured</p>}
      {isLoading && <Loader />}
      {photos.length > 0 && <Button onClick={handleLoadMore} />}
      {modal.showModal && (
        <Modal photo={modal.modalPhoto} onClick={handleModalClose} />
      )}
    </div>
  );
};

export default App;
