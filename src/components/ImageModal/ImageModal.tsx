import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import s from './ImageModal.module.css';
import { ImageModalProps } from '../App/App.types';
import Loader from '../Loader/Loader';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    background: 'rgba(0,0,0,0.6)',
  },
};

Modal.setAppElement('#root');

const ImageModal = ({
  modalIsOpen,
  closeModal,
  src,
  alt,
  likes,
}: ImageModalProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (modalIsOpen) {
      setLoading(true);
    }
  }, [src, modalIsOpen]);

  const handleImageLoad = () => setLoading(false);
  const handleImageError = () => setLoading(false);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      style={customStyles}
      contentLabel="Image Modal"
    >
      {loading && <Loader />}
      {src && (
        <img
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ display: loading ? 'none' : 'block', maxWidth: '100%' }}
        />
      )}
      {!loading && <p className={s.modalLikes}>Total likes: {likes}</p>}
    </Modal>
  );
};

export default ImageModal;
