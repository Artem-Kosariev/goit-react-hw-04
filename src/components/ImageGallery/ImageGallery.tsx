import React from 'react';
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';
import {Image} from '../../types'

interface ImageGalleryProps {
  gallery: Image[];
  openModal: (id: string, alt_description: string) => void;
  upData: (src: string, alt: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ gallery, openModal, upData }) => {
  return (
    <ul className={css.itemsContainer}>
      {gallery.map(({ id, alt_description, urls }) => (
        <li
          className={css.cardItem}
          key={id}
          onClick={() => openModal(id, alt_description)} 
        >
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
