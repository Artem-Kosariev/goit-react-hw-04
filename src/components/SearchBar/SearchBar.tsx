import toast from 'react-hot-toast';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import {FormValues} from '../../types'

import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const initialValues: FormValues = { query: '' };

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: FormValues, actions: FormikHelpers<FormValues>) => {
        if (!values.query) {
          toast.error('Please enter the value in the search field');
          return;
        }
        onSubmit(values.query);
        actions.resetForm();
      }}
    >
      <Form className={css.searchForm}>
        <Field
          className={css.searchInput}
          name='query'
          type='search'
          autoComplete='off'
          autoFocus
          placeholder='Search images and photos'
        />
        <button type='submit'>Search</button>
      </Form>
    </Formik>
  );
};

export default SearchBar;
