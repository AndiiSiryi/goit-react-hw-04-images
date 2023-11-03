import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, tags, id, largeImageURL }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // state = {
  //   modalIsOpen: false,
  // };
  const toggleModal = () => {
    setModalIsOpen(prevModalIsOpen => !prevModalIsOpen);
  };

  // toggleModal = () => {
  //   this.setState(({ modalIsOpen }) => ({ modalIsOpen: !modalIsOpen }));
  // };
  //   const { webformatURL, tags, id, largeImageURL } = this.props;
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
        onClick={toggleModal}
        id={id}
      />
      {modalIsOpen && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          closeModal={toggleModal}
        />
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
