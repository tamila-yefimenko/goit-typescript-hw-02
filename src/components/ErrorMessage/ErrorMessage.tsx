import { ReactElement } from 'react';
import s from './ErrorMessage.module.css';

const ErrorMessage = (): ReactElement => {
  return <p className={s.errorMessage}>Oops! Something went wrong...</p>;
};

export default ErrorMessage;
