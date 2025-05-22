import { Formik, Form, Field } from 'formik';
import toast from 'react-hot-toast';
import s from './SearchBar.module.css';
import { SearchBarProps } from '../App/App.types';
import { FormValues } from '../App/App.types';
import { FormikHelpers } from 'formik';
import { JSX } from 'react';

const SearchBar = ({ onSubmit }: SearchBarProps): JSX.Element => {
  const initialValues: FormValues = { search: '' };

  return (
    <header className={s.header}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values: FormValues, actions: FormikHelpers<FormValues>) => {
          const query = values.search.trim();

          if (query === '') {
            toast.error('Please enter a search term!');
            return;
          }

          onSubmit(query);
          actions.resetForm();
        }}
      >
        <Form className={s.form}>
          <Field
            className={s.formInput}
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button className={s.formButton} type="submit">
            Search
          </button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
