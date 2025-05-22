import PacmanLoader from 'react-spinners/PacmanLoader';
import s from './Loader.module.css';

const override = {
  display: 'block',
  margin: '0 auto',
};

const Loader = () => {
  return (
    <div className={s.backdrop}>
      <PacmanLoader color="#3ed4dc" cssOverride={override} />
    </div>
  );
};
export default Loader;
