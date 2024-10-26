import Modal from 'react-modal';

import css from './ImageModal.module.css';

const ImageModal = ({ modalIsOpen, closeModal, src, alt }) => {
	return (
		<Modal
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			className={css.modal}
			overlayClassName={css.overlay}
		>
			<button onClick={closeModal} className={css.closeBtn}>
				X
			</button>
			<div>
				<img className={css.modalImg} src={src} alt={alt} />
			</div>
		</Modal>
	);
};

export default ImageModal;