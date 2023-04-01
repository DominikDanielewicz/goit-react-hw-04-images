import React, { Component } from 'react';
import css from './Searchbar.module.css';
import propTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = e => {
    this.setState({
      searchQuery: e.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchQuery);
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <header className={css.searchbar}>
        <form className={css.searchform} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchform__button}>
            <span className={css.searchform__label}>Search</span>
          </button>
          <input
            className={css.searchform__input}
            id="search"
            value={searchQuery}
            onChange={this.handleChange}
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};

export default Searchbar;
