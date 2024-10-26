
import css from './ErroreMessage.module.css'

const ErrorMessage = () => {
	return (
		<div className={css.errorWrapper}>
			<p className={css.errorText}>
				Something went wrong, please reload you page!
			</p>
		</div>
	);
};

export default ErrorMessage;