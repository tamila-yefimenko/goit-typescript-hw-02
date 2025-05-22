import { useEffect, useState } from 'react';
import { getPhotos } from './apiService/request';
import { Toaster } from 'react-hot-toast';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';

function App() {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalAlt, setModalAlt] = useState('');
  const [modalSrc, setModalSrc] = useState('');
  const [likes, setLikes] = useState('');

  useEffect(() => {
    if (!query) return;

    const fetchPhotos = async () => {
      setIsLoading(true);
      try {
        const { total_pages, results } = await getPhotos(query, page);
        if (!results.length) {
          return setIsEmpty(true);
        }
        setPhotos(prevPhotos => [...prevPhotos, ...results]);
        setIsVisible(page < total_pages);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPhotos();
  }, [query, page]);

  const getQuery = inputValue => {
    setQuery(inputValue);
    setPhotos([]);
    setPage(1);
    setError(null);
    setIsEmpty(false);
    setIsVisible(false);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (src, alt, likes) => {
    setModalIsOpen(true);
    setModalSrc(src);
    setModalAlt(alt);
    setLikes(likes);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalSrc('');
    setModalAlt('');
    setLikes('');
  };

  return (
    <>
      <SearchBar onSubmit={getQuery} />
      <Toaster position="top-center" />
      {isEmpty && (
        <p style={{ color: '#035d60', fontSize: '20px' }}>
          No results found. Try a different search.
        </p>
      )}
      {photos.length > 0 && (
        <ImageGallery photos={photos} openModal={openModal} />
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {photos.length > 0 && !isLoading && isVisible && (
        <LoadMoreBtn onClick={handleLoadMore} disabled={isLoading}>
          {'Load More'}
        </LoadMoreBtn>
      )}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        src={modalSrc}
        alt={modalAlt}
        likes={likes}
      />
    </>
  );
}

export default App;
