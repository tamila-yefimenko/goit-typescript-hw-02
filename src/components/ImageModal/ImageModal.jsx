import Modal from 'react-modal';
import s from './ImageModal.module.css';

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

const ImageModal = ({ modalIsOpen, closeModal, src, alt, likes }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {src && <img src={src} alt={alt} />}
      <p className={s.modalLikes} likes={likes}>
        Total likes: {likes}{' '}
      </p>
    </Modal>
  );
};

export default ImageModal;
