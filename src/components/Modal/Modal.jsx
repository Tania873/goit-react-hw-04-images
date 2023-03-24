import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

function Modal({ alt, src, onClose }) {
  const handleKeyDown = e => e.code === 'Escape' && onClose();

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleBackdropClick = ({ target, currentTarget }) => {
    target === currentTarget && onClose();
  };

  return (
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}

export default Modal;

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
