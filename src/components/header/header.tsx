import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/const';

function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="container container--size-l">
        <Link className="logo header__logo" to={AppRoute.Root} aria-label="Перейти на Главную">
          <svg width="134" height="52" aria-hidden="true">
            <use xlinkHref="#logo"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="link not-disabled active" to={AppRoute.Root}>Квесты</Link>
            </li>
            <li className="main-nav__item">
              <Link className="link" to={AppRoute.Contacts}>Контакты</Link>
            </li>
          </ul>
        </nav>
        <div className="header__side-nav">
          <a className="link header__side-item header__phone-link" href="tel:88003335599">8 (000) 111-11-11</a>
        </div>
      </div>
    </header>
  );
}

export default Header;
