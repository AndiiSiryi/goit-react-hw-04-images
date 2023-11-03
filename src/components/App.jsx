import React, { useState, useEffect, useRef } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import getImages from './PixabayApi/PixabayApi';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './App.module.css';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showTotalHitsNotification, setShowTotalHitsNotification] =
    useState(false);

  const searchQueryRef = useRef(null);

  useEffect(() => {
    if (searchQuery === null) {
      return;
    }
    if (!searchQuery) {
      Notify.failure('Search query is empty. Please enter a query.');
      return;
    }
    setIsLoading(true);
    setError(null);

    getImages(searchQuery, page)
      .then(response => {
        const { data } = response;

        if (data.totalHits === 0) {
          Notify.failure('No results, please try another query.');
          setIsLoading(false);
        } else {
          setImages(prevImages =>
            page === 1 ? [...data.hits] : [...prevImages, ...data.hits]
          );
          setTotalHits(data.totalHits);

          if (!showTotalHitsNotification) {
            Notify.success(`Found a total of ${data.totalHits} images.`);
            setShowTotalHitsNotification(true);
          }

          setIsLoading(false);
        }
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
        Notify.failure('Error');
      });
  }, [searchQuery, page, showTotalHitsNotification, totalHits]);

  const handleSubmit = searchQuery => {
    if (searchQuery === searchQueryRef.current) {
      Notify.warning(`You are already viewing the request ${searchQuery}`);
    } else {
      setSearchQuery(searchQuery);
      searchQueryRef.current = searchQuery;
      setImages([]);
      setPage(1);
      setShowTotalHitsNotification(false);
    }
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSubmit} />
      {error && <h2>Error, please, try again</h2>}
      {images.length > 0 ? (
        <ImageGallery data={images} />
      ) : (
        <p
          style={{
            padding: 100,
            textAlign: 'center',
            fontSize: 30,
            fontFamily: 'cursive',
            color: '#9797a5',
          }}
        >
          Image gallery is empty... 🖼️
        </p>
      )}
      {!isLoading && images.length !== 0 && (
        <Button onBtnClick={handleLoadMore} />
      )}
      {isLoading && <Loader />}
    </div>
  );
};
