import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

function Modal({ src, onClose }) {
  useEffect(() => {
    const handleKeyDown = e => e.code === 'Escape' && onClose();
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = ({ target, currentTarget }) => {
    target === currentTarget && onClose();
  };

  return (
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <img src={src} alt="" />
      </div>
    </div>
  );
}

export default Modal;

Modal.propTypes = {
  src: PropTypes.string.isRequired,
};
