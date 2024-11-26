import css from './ErrorMessage.module.css';

const ErrorMessage: React.FC = () => {
  return (
    <div className={css.errorWrapper}>
      <p className={css.errorText}>
        Something went wrong, please reload your page!
      </p>
    </div>
  );
};

export default ErrorMessage;
