import { useNavigate } from 'react-router-dom';
import styles from './Button.module.css';

function ButtonBack({ disabled = false, to = -1, children }) {
  const navigate = useNavigate();

  return (
    <button
      className={`${styles.btn} ${styles.back}`}
      onClick={(e) => {
        e.preventDefault();
        if (!disabled) navigate(to);
      }}
      disabled={disabled}>
      {children || '← Back'}
    </button>
  );
}

export default ButtonBack;
