import { useEffect, useState } from 'react';
import Notiflix from 'notiflix';
import css from './App.module.css';

import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
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
  const [loadMore, setLoadMore] = useState(false);
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
          setLoadMore(false);
          setIsLoading(false);
        } else {
          setLoadMore(true);
        }

        if (page === 1) {
          setImages(data.hits);
          setTotalPages(Math.ceil(data.totalHits / 12));
        } else {
          setImages(prevState => [...prevState, ...data.hits]);
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      })
      .catch(error => Notiflix.Notify.error('Something went wrong!'))
      .finally(() => setIsLoading(false));
  }, [page, searchQuery]);

  useEffect(() => {
    setImages([]);
    setPage(1);
  }, [searchQuery]);

  const loadMoreHandler = () => {
    setPage(page + 1);
  };

  const formSubmitHandler = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    // setImages([]);
  };

  const toggleModal = (src, alt) => {
    setShowModal(!showModal);
    setTargetImage({ src, alt });
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={formSubmitHandler} />
      {images.length > 0 && (
        <ImageGallery>
          <ImageGalleryItem images={images} onClick={toggleModal} />
        </ImageGallery>
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
