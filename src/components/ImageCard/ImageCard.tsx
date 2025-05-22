import { ImageCardProps } from '../App/App.types';
import s from './ImageCard.module.css';

const ImageCard = ({ photo, openModal }: ImageCardProps) => {
  return (
    <div>
      <img
        className={s.image}
        src={photo.urls.small}
        alt={photo.alt_description}
        onClick={() =>
          openModal(
            photo.urls.regular,
            photo.alt_description,
            photo.user.total_likes
          )
        }
      />
    </div>
  );
};

export default ImageCard;
