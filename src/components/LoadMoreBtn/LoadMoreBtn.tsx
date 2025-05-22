import { LoadMoreButtonProps } from '../App/App.types';
import s from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ children, onClick, disabled }: LoadMoreButtonProps) => {
  return (
    <button className={s.loadButton} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default LoadMoreBtn;
