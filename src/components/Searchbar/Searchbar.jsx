import { useState } from 'react';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      Notiflix.Notify.failure('No images found!');
      return;
    }
    onSubmit(searchQuery);
  };

  const handleChange = e => {
    const { value } = e.currentTarget;
    setSearchQuery(value.toLowerCase());
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={handleSubmit} className={css.form}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input
          onChange={handleChange}
          value={searchQuery}
          className={css.input}
          name="searchQuery"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
