import React from 'react';
import css from './Button.module.css';
import propTypes from 'prop-types';

const Button = props => {
  return (
    <button className={css.button} onClick={props.onClick}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onClick: propTypes.func.isRequired,
};

export default Button;
