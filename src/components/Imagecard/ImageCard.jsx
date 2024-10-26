import css from './ImageCard.module.css';

const ImageCard = ({ alt_description, urls, upData }) => {
	return (
		<div
			className={css.cardWrapper}
			onClick={() => upData(urls.regular,)}
		>
			<img
				className={css.cardImage}
				src={urls.small}
				alt={alt_description}

			/>
		</div>
	);
};

export default ImageCard;