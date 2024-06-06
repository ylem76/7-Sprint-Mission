import logoImg from '../../assets/images/logo.png';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

export default function Header() {
  const pathName = window.location.pathname;
  const currentPathName = pathName.match(/\/([^\/]+)(\/|$)/)[1];

  return (
    <header className={styles.gnb}>
      <div className={styles.logo}>
        <Link to='/'>
          <img src={logoImg} alt='판다마켓 로고' />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to='/'>자유게시판</Link>
          </li>
          <li>
            <Link
              to='/items'
              className={currentPathName === 'items' ? styles.current : ''}>
              중고마켓
            </Link>
          </li>
        </ul>
      </nav>
      <Link to='/login'>로그인</Link>
    </header>
  );
}
