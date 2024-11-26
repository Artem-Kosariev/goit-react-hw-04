import { useEffect, useRef, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';

import './App.css';
import fetchPhotos from '../../api/Fetchphoto-api';

import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import {AppState } from '../../types';



Modal.setAppElement('#root');

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    page: 1,
    queryValue: '',
    gallery: [],
    isLoading: false,
    isError: false,
    totalPages: 0,
    noResults: false,
    modalOpen: false,
    modalImage: '',
    alt: ''
  });

  const imgRef = useRef<HTMLDivElement | null>(null);

  const handleQuery = (newQuery: string) => {
    setState(prevState => ({
      ...prevState,
      queryValue: newQuery,
      gallery: [],
      page: 1,
      noResults: false
    }));
  };

  useEffect(() => {
    if (state.page === 1) return;
    if (imgRef.current) {
      imgRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [state.page, state.gallery]);

  useEffect(() => {
    if (state.queryValue === '') return;

    const handleSearch = async () => {
      try {
        setState(prevState => ({ ...prevState, isLoading: true, isError: false }));
        const data = await fetchPhotos(state.queryValue, state.page);
        if (data.total === 0) {
          setState(prevState => ({ ...prevState, noResults: true }));
          return;
        }
        setState(prevState => ({
          ...prevState,
          gallery: [...prevState.gallery, ...data.results],
          totalPages: data.total_pages
        }));
      } catch (error) {
        setState(prevState => ({ ...prevState, isError: true }));
      } finally {
        setState(prevState => ({ ...prevState, isLoading: false }));
      }
    };
    handleSearch();
  }, [state.page, state.queryValue]);

  const handleMore = () => {
    setState(prevState => ({ ...prevState, page: prevState.page + 1 }));
  };

  const openModal = () => {
    setState(prevState => ({ ...prevState, modalOpen: true }));
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setState(prevState => ({ ...prevState, modalOpen: false }));
    document.body.style.overflow = 'unset';
  };

  const upData = (src: string, alt: string) => {
    setState(prevState => ({ ...prevState, modalImage: src, alt }));
  };

  return (
    <div ref={imgRef}>
      <SearchBar onSubmit={handleQuery} />
      {state.gallery.length > 0 && (
        <ImageGallery
          gallery={state.gallery}
          openModal={openModal}
          upData={upData}
        />
      )}
      {state.isLoading && <Loader />}
      {state.isError && <ErrorMessage />}
      {state.noResults && !state.isLoading && !state.isError && (
        <p>No images found. Please try a different search.</p>
      )}
      {state.gallery.length > 0 && !state.isLoading && !state.isError && state.totalPages > state.page && (
        <LoadMoreBtn handleMore={handleMore} />
      )}
      <ImageModal
        modalIsOpen={state.modalOpen}
        closeModal={closeModal}
        src={state.modalImage}
        alt={state.alt}
      />
      <Toaster position='center' reverseOrder={true} />
    </div>
  );
};

export default App;
