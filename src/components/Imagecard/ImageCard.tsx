import css from './ImageCard.module.css';

interface ImageCardProps {
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
  upData: (src: string, alt: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ alt_description, urls, upData }) => {
  return (
    <div
      className={css.cardWrapper}
      onClick={() => upData(urls.regular, alt_description)}
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
