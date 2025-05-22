import PacmanLoader from 'react-spinners/PacmanLoader';
import { ReactElement, CSSProperties } from 'react';
import s from './Loader.module.css';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
};

const Loader = (): ReactElement => {
  return (
    <div className={s.backdrop}>
      <PacmanLoader color="#3ed4dc" cssOverride={override} />
    </div>
  );
};
export default Loader;
