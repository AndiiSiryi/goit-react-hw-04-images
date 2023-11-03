import React, { useState } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  // state = {
  //     query: ''
  // };
  const handleQueryChange = e => {
    setQuery(e.currentTarget.value);
  };

  // handleQueryChange = (e) => {
  //     this.setState({query: e.currentTarget.value})
  // }
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query.trim());
    reset();
  };

  // handleSubmit = (e) => {
  //     e.preventDefault();
  //     this.props.onSubmit(this.state.query.trim());
  //     this.reset()
  // }
  const reset = () => {
    setQuery('');
  };

  // reset = () => {
  //     this.setState({ query: '' });
  //   };
  // const {query} = this.state
  return (
    <header className={css.SearchBar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>
        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleQueryChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
