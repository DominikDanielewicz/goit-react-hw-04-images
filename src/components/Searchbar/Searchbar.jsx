import React from 'react';
import css from './Searchbar.module.css';
import propTypes from 'prop-types';

const Searchbar = props => {
  return (
    <header className={css.searchbar}>
      <form className={css.searchform} onSubmit={props.onSubmit}>
        <button type="submit" className={css.searchform__button}>
          <span className={css.searchform__label}>Search</span>
        </button>
        <input
          className={css.searchform__input}
          id="search"
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};

export default Searchbar;
