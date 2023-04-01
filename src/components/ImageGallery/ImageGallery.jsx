import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';
import css from './ImageGallery.module.css';
import propTypes from 'prop-types';

const ImageGallery = props => {
  return (
    <ul className={css.imageGallery}>
      {props.photos.map(photo => (
        <ImageGalleryItem
          key={photo.id}
          smallImage={photo.webformatURL}
          largeImage={photo.largeImageURL}
          alt={photo.tags}
          onClick={props.onClick}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  photos: propTypes.arrayOf(
    propTypes.shape({
      key: propTypes.string,
      smallImage: propTypes.string,
      largeImage: propTypes.string,
      alt: propTypes.string,
    })
  ),
  onClick: propTypes.func.isRequired,
};

export default ImageGallery;
