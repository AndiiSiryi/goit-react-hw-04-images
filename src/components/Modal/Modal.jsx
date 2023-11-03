import React, { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ largeImageURL, tags, closeModal }) => {
  useEffect(() => {
    const closeByEsc = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', closeByEsc);
    return () => {
      window.removeEventListener('keydown', closeByEsc);
    };
  }, [closeModal]);

  const closeByBackdrop = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  // componentDidMount() {
  //     window.addEventListener('keydown', this.closeByEsc);
  //   }

  //   componentWillUnmount() {
  //     window.removeEventListener('keydown', this.closeByEsc);
  //   }

  //   closeByEsc = (e) => {
  //     if (e.code === 'Escape') {
  //       this.props.closeModal();
  //     }
  //   };

  //   closeByBackdrop = event => {
  //     if (event.target === event.currentTarget) {
  //       this.props.closeModal();
  //     }
  //   };

  // const { largeImageURL, tags } = this.props;
  return (
    <div className={css.Overlay} onClick={closeByBackdrop}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default Modal;
