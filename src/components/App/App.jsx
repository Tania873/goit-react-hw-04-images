import { useEffect, useState } from 'react';
import Notiflix from 'notiflix';
import css from './App.module.css';

import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import fetchImages from '../../Api';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [targetImage, setTargetImage] = useState(null);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    setIsLoading(true);

    fetchImages(searchQuery, page)
      .then(data => {
        if (!data.hits.length) {
          Notiflix.Notify.failure('No images found!');
        } else {
          setImages(prevState => [...prevState, ...data.hits]);
          setTotalPages(Math.ceil(data.totalHits / 12));
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      })
      .catch(error => Notiflix.Notify.error('Something went wrong!'))
      .finally(() => setIsLoading(false));
  }, [page, searchQuery]);

  const loadMoreHandler = () => {
    setPage(prevState => prevState + 1);
  };

  const formSubmitHandler = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const toggleModal = (src, alt) => {
    setShowModal(!showModal);
    setTargetImage({ src, alt });
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={formSubmitHandler} />
      {images.length > 0 && (
        <ImageGallery images={images} onClick={toggleModal} />
      )}
      {showModal && (
        <Modal
          src={targetImage.src}
          alt={targetImage.alt}
          onClose={toggleModal}
        />
      )}
      {isLoading && <Loader />}
      {loadMore && page < totalPages && <Button onClick={loadMoreHandler} />}
    </div>
  );
}
