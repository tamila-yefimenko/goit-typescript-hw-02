export interface IPhoto {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
  user: {
    total_likes: number;
  };
}

export interface GetPhotosResponse {
  total_pages: number;
  results: IPhoto[];
}

export type GalleryProps = {
  photos: IPhoto[];
  openModal: (src: string, alt: string, likes: number) => void;
};

export type ImageCardProps = {
  photo: IPhoto;
  openModal: (src: string, alt: string, likes: number) => void;
};

export type ImageModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  src: string;
  alt: string;
  likes: number;
};

export type LoadMoreButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
};

export type SearchBarProps = {
  onSubmit: (query: string) => void;
};

export type FormValues = {
  search: string;
};
