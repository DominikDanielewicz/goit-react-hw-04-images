import React, { Component } from 'react';
import css from './Modal.module.css';
import propTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleClose);
  }

  handleClose = e => {
    if (e.code === 'Escape') {
      return this.props.onClick();
    }
  };

  render() {
    return (
      <div className={css.overlay} onClick={this.props.onClick}>
        <div className={css.modal}>
          <img src={this.props.photo} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  photo: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
};

export default Modal;
