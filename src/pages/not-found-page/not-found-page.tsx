import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';

function NotFound(): JSX.Element {
  return (
    <div className="wrapper">
      <Helmet>
        <title>{'Escape Room - Not Found'}</title>
      </Helmet>
      <Header></Header>

      <main className="decorated-page quest-page">
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
          <div className="quest-page__content">
            <h1 className="title title--size-l title--uppercase quest-page__title">404 Not Found</h1>
            <a className="btn btn--accent btn--cta quest-page__btn" href="/">На главную</a>
          </div>
        </div>
      </main>

      <Footer></Footer>
    </div>
  );
}

export default NotFound;
