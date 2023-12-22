import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useEffect, } from 'react';
import { AppRoute } from '../../const/const';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { loginAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { checkAuthorizationStatus } from '../../utils/utils';
import { getAutorisationStatus, getLoginErrorStatus, getLoginProcessStatus } from '../../store/user-slice/selectors';
import ErrorSending from '../../components/error-sending/error-sending';

type LocationState = {
  from: {
    pathname: string;
  };
}

type FormInputs = {
  email: string;
  password: string;
}

function LoginPage(): JSX.Element {

  const navigate = useNavigate();

  const authorizationStatus = useAppSelector(getAutorisationStatus);
  const hasError = useAppSelector(getLoginErrorStatus);
  const isLoginProcess = useAppSelector(getLoginProcessStatus);

  const location = useLocation();

  const { from } = location.state as LocationState || { from: { pathname: AppRoute.Root } };

  const isLogged = checkAuthorizationStatus(authorizationStatus);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isValid
    },
  } = useForm<FormInputs>({
    mode: 'onBlur'
  });

  useEffect(() => {

    if (isLogged) {
      navigate(from);
    }

  }, [isLogged, navigate, from]);

  function handleFormSubmit(data: FormInputs) {
    dispatch(loginAction({
      email: data.email,
      password: data.password
    }));
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>{'Escape Room - Login'}</title>
      </Helmet>
      <Header></Header>

      <main className="decorated-page login">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source type="image/webp"
              srcSet="img/content/maniac/maniac-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x"
            >
            </source>
            <img
              src="img/content/maniac/maniac-size-m.jpg" srcSet="img/content/maniac/maniac-size-m@2x.jpg 2x" width="1366"
              height="768" alt=""
            />
          </picture>
        </div>
        <div className="container container--size-l">
          <div className="login__form">
            <form className="login-form" action="https://echo.htmlacademy.ru/" method="post" onSubmit={(event) =>
              void handleSubmit(handleFormSubmit)(event)}
            >
              <div className="login-form__inner-wrapper">
                <h1 className="title title--size-s login-form__title">Вход</h1>
                <div className="login-form__inputs">
                  <div className="custom-input login-form__input">
                    <label className="custom-input__label" htmlFor="email">E&nbsp;&ndash;&nbsp;mail</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Адрес электронной почты"
                      {...register('email', {
                        required: 'Укажите email',
                        pattern: {
                          value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: 'Введите корректный email'
                        }
                      })}
                    />
                    <div style={{ color: '#994a4a' }}>
                      {errors?.email && <p>{errors?.email.message || 'Некорректный email'}</p>}
                    </div>
                  </div>
                  <div className="custom-input login-form__input">
                    <label className="custom-input__label" htmlFor="password">Пароль</label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Пароль"
                      {...register('password', {
                        required: 'Укажите пароль',
                        pattern: {
                          value: /(?=^.{3,15}$)(?=.*[0-9])(?=.*[a-z])[0-9a-z]{2,}/,
                          message: 'Введите корректный пароль'
                        }
                      })}
                    />
                    <div style={{ color: '#994a4a' }}>
                      {errors?.password && <p>{errors?.password.message || 'Некорректный пароль'}</p>}
                    </div>
                  </div>
                </div>
                <button className="btn btn--accent btn--general login-form__submit" type="submit" disabled={!isValid || isLoginProcess}>Войти</button>
                {hasError && <ErrorSending></ErrorSending>}
              </div>
              <label className="custom-checkbox login-form__checkbox">
                <input type="checkbox" id="id-order-agreement" name="user-agreement" required />
                <span
                  className="custom-checkbox__icon"
                >
                  <svg width="20" height="17" aria-hidden="true">
                    <use xlinkHref="#icon-tick"></use>
                  </svg>
                </span>
                <span className="custom-checkbox__label">Я&nbsp;согласен с
                  <a className="link link--active-silver link--underlined" href="#"> правилами обработки персональных
                    данных
                  </a>&nbsp;и пользовательским соглашением
                </span>
              </label>
            </form>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default LoginPage;
