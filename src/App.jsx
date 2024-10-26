import { useEffect, useRef, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';

import './App.css';
import fetchPhotos from './api/Fetchphoto-api';

import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';

Modal.setAppElement('#root');

function App() {
	const [page, setPage] = useState(1);
	const [queryValue, setQueryValue] = useState('');
	const [gallery, setGallery] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [noResults, setNoResults] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [modalImage, setModalImage] = useState('');
	const [alt, setAlt] = useState('');

	const imgRef = useRef();

		const handleQuery = (newQuery) => {
		setQueryValue(newQuery);
		setGallery([]);
		setPage(1);
		setNoResults(false)
		};
	
		useEffect(() => {
    if (page === 1) return;
    if (imgRef.current) {
        imgRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
		}, [page, gallery]);
	

		useEffect(() => {
		if (queryValue === '') return;

		const handleSearch = async () => {
			try {
				setIsLoading(true);
				setIsError(false);
				const data = await fetchPhotos(queryValue, page);
				if (data.total === 0) {
					setNoResults(true);
					return;
				}
				setGallery((prevGallery) => [...prevGallery, ...data.results]);
				setTotalPages(data.total_pages);
			} catch (error) {
				setIsError(true);
			} finally {
				setIsLoading(false);
			}
		};
		handleSearch();
	}, [page, queryValue]);





	const handleMore = () => {
		setPage(page + 1);
	};

	const openModal = () => {
		setModalOpen(true);
		 document.body.style.overflow = 'hidden';
	};

	const closeModal = () => {
		setModalOpen(false);
		document.body.style.overflow = 'unset';
	};

	const upData = (src, alt) => {
		setModalImage(src);
		setAlt(alt);
	};

	return (
		<div ref={imgRef}>
			<SearchBar onSubmit={handleQuery} />
			{gallery.length > 0 && (
				<ImageGallery
					gallery={gallery}
					openModal={openModal}
					upData={upData}
				/>
			)}
			{isLoading && <Loader />}
			{isError && <ErrorMessage />}
			{noResults && !isLoading && !isError && (
				<p>No images found. Please try a different search.</p>
			)}
			{gallery.length > 0 && !isLoading && !isError && totalPages > page && (
				<LoadMoreBtn handleMore={handleMore} />
			)}
			<ImageModal
				modalIsOpen={modalOpen}
				closeModal={closeModal}
				src={modalImage}
				alt={alt}
			/>
			<Toaster position='center' reverseOrder={true} />
		</div>
	);
}


export default App;