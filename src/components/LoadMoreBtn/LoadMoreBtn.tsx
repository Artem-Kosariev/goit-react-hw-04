import css from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  handleMore: () => void;
  isActive: boolean;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ handleMore, isActive }) => {
  return (
    <button onClick={handleMore} type='button' disabled={isActive} className={css.moreBtn}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
