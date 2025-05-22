import { useEffect, useState } from 'react';
import { getPhotos } from '../../apiService/request';
import { Toaster } from 'react-hot-toast';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageModal from '../ImageModal/ImageModal';
import { IPhoto } from './App.types';

function App() {
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalAlt, setModalAlt] = useState<string>('');
  const [modalSrc, setModalSrc] = useState<string>('');
  const [likes, setLikes] = useState<number>(0);

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
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Unknown error');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchPhotos();
  }, [query, page]);

  const getQuery = (inputValue: string): void => {
    setQuery(inputValue);
    setPhotos([]);
    setPage(1);
    setError(null);
    setIsEmpty(false);
    setIsVisible(false);
  };

  const handleLoadMore = (): void => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (src: string, alt: string, likes: number): void => {
    setModalIsOpen(true);
    setModalSrc(src);
    setModalAlt(alt);
    setLikes(likes);
  };

  const closeModal = (): void => {
    setModalIsOpen(false);
    setModalSrc('');
    setModalAlt('');
    setLikes(0);
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
