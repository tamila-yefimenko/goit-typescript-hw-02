import { GalleryProps } from '../App/App.types';
import ImageCard from '../ImageCard/ImageCard';
import s from './ImageGallery.module.css';

const ImageGallery = ({ photos, openModal }: GalleryProps) => {
  return (
    <ul className={s.imageList}>
      {photos.map(photo => (
        <li className={s.imageItem} key={photo.id}>
          <ImageCard photo={photo} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
