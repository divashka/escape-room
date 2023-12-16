import { FormEvent, useState, FocusEvent, ChangeEvent, useEffect, } from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { loginAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';

function LoginPage(): JSX.Element {

  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('Email не может быть пустым');
  const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);


  function handleBlur(evt: FocusEvent<HTMLInputElement>) {
    switch (evt.target.name) {
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
    }
  }

  function handleEmailChange(evt: ChangeEvent<HTMLInputElement>) {
    setEmail(evt.target.value);
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexp.test(String(evt.target.value).toLocaleLowerCase())) {
      setEmailError('Email не корректен');
    } else {
      setEmailError('');
    }
  }

  function handlePasswordChange(evt: ChangeEvent<HTMLInputElement>) {
    setPassword(evt.target.value);
    const regexp = /(?=^.{3,15}$)(?=.*[a-z])[0-9a-z]{3,}/;
    if (!regexp.test(String(evt.target.value).toLocaleLowerCase())) {
      setPasswordError('Пароль не корректен');
    } else {
      setPasswordError('');
    }
  }

  function handleFormSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    dispatch(loginAction({
      email: email,
      password: password
    }));
  }

  return (
    <div className="wrapper">
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
            <form className="login-form" action="https://echo.htmlacademy.ru/" method="post" onSubmit={handleFormSubmit}>
              <div className="login-form__inner-wrapper">
                <h1 className="title title--size-s login-form__title">Вход</h1>
                <div className="login-form__inputs">
                  <div className="custom-input login-form__input">
                    {(emailDirty && emailError && <div style={{ color: '#994a4a' }}>{emailError}</div>)}
                    <label className="custom-input__label" htmlFor="email">E&nbsp;&ndash;&nbsp;mail</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Адрес электронной почты"
                      required
                      value={email}
                      onBlur={handleBlur}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div className="custom-input login-form__input">
                    {(passwordDirty && passwordError && <div style={{ color: '#994a4a' }}>{passwordError}</div>)}
                    <label className="custom-input__label" htmlFor="password">Пароль</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Пароль"
                      required
                      onBlur={handleBlur}
                      onChange={handlePasswordChange}
                      data-testid="passwordElement"
                    />
                  </div>
                </div>
                <button className="btn btn--accent btn--general login-form__submit" type="submit" disabled={!formValid}>Войти</button>
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
