import React from 'react';
import CircleLoader from 'react-spinners/ClipLoader';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loader}>
      <CircleLoader color="#3f51b5" />
    </div>
  );
};

export default Loader;
