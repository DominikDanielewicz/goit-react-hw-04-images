import React from 'react';
import css from './ImageGalleryItem.module.css';
import propTypes from 'prop-types';

const ImageGalleryItem = props => {
  return (
    <li className={css.imageGalleryItem}>
      <img
        className={css.imageGalleryItem__image}
        src={props.smallImage}
        alt={props.alt}
        onClick={() => props.onClick(props.largeImage)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  largeImage: propTypes.string.isRequired,
  alt: propTypes.string,
  smallImage: propTypes.string.isRequired,
  onClick: propTypes.func,
};

export default ImageGalleryItem;
