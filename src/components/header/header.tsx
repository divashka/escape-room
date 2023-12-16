import { useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { checkAuthorizationStatus } from '../../utils/utils';
import { getAutorisationStatus } from '../../store/user-slice/selectors';
import { logoutAction } from '../../store/api-actions';

function Header(): JSX.Element {

  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAutorisationStatus);

  const isLogged = checkAuthorizationStatus(authorizationStatus);

  const handleLogoutClick = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

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
              <NavLink className="link not-disabled" to={AppRoute.Root}>Квесты</NavLink>
            </li>
            <li className="main-nav__item">
              <NavLink className="link" to={AppRoute.Contacts}>Контакты</NavLink>
            </li>
            {
              isLogged &&
              <li className="main-nav__item">
                <NavLink className="link" to={AppRoute.MyQuests}>Мои бронирования</NavLink>
              </li>
            }
          </ul>
        </nav>
        <div className="header__side-nav">
          {!isLogged && <Link className="btn header__side-item header__login-btn" to={AppRoute.Login}>Вход</Link>}
          {isLogged && <Link className="btn btn--accent header__side-item" to={''} onClick={handleLogoutClick}>Выйти</Link>}
          <a className="link header__side-item header__phone-link" href="tel:88003335599">8 (000) 111-11-11</a>
        </div>
      </div>
    </header>
  );
}

export default Header;
