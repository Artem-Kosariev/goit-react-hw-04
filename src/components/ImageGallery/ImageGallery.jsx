import ImageCard from '../Imagecard/ImageCard'
import css from './ImageGallery.module.css';

const ImageGallery = ({ gallery, openModal, upData }) => { 
	return (
		<ul className={css.itemsContainer}>
			{gallery.map(({ id, alt_description, urls }) => (
				<li className={css.cardItem} key={id} onClick={openModal}>
					<ImageCard
						urls={urls}
						alt_description={alt_description}
						upData={upData}
					/>
				</li>
			))}
		</ul>
	);
};

export default ImageGallery;