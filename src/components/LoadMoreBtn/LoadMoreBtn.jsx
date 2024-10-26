import css from './LoadMoreBtn.module.css'
const LoadMoreBtn = ({ handleMore, isActive }) => {
	return (
		<button onClick={handleMore} type='button' disabled={isActive} className={css.moreBtn}  >
			Load more
		</button>
	);
};

export default LoadMoreBtn;