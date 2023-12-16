import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { getBookingQuests } from '../../store/reservation-slice/selectors';
import NotBookingQuests from '../../components/not-booking-quests/not-booking-quests';

function MyQuestsPage(): JSX.Element {

  const bookingQuests = useAppSelector(getBookingQuests);

  return (
    <div className="wrapper">
      <Header></Header>
      <main className="page-content decorated-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source type="image/webp"
              srcSet="img/content/maniac/maniac-bg-size-m.webp, img/content/maniac/maniac-bg-size-m@2x.webp 2x"
            >
            </source>
            <img
              src="img/content/maniac/maniac-bg-size-m.jpg" srcSet="img/content/maniac/maniac-bg-size-m@2x.jpg 2x"
              width="1366" height="1959" alt=""
            />
          </picture>
        </div>
        <div className="container">
          <div className="page-content__title-wrapper">
            <h1 className="title title--size-m page-content__title">Мои бронирования</h1>
          </div>
          {
            bookingQuests.length === 0 ? <NotBookingQuests></NotBookingQuests> :
              <div className="cards-grid">
                <div className="quest-card">
                  <div className="quest-card__img">
                    <picture>
                      <source type="image/webp"
                        srcSet="img/content/maniac/maniac-size-s.webp, img/content/maniac/maniac-size-s@2x.webp 2x"
                      >

                      </source>
                      <img
                        src="img/content/maniac/maniac-size-s.jpg" srcSet="img/content/maniac/maniac-size-s@2x.jpg 2x"
                        width="344" height="232" alt="Мужчина в маске в тёмном переходе."
                      />
                    </picture>
                  </div>
                  <div className="quest-card__content">
                    <div className="quest-card__info-wrapper"><a className="quest-card__link" href="quest.html">Маньяк</a>
                      <span
                        className="quest-card__info"
                      >
                        [сегодня,&nbsp;17:00. наб. реки Карповки&nbsp;5, лит&nbsp;П<br></br>м.
                        Петроградская]
                      </span>
                    </div>
                    <ul className="tags quest-card__tags">
                      <li className="tags__item">
                        <svg width="11" height="14" aria-hidden="true">
                          <use xlinkHref="#icon-person"></use>
                        </svg>6&nbsp;чел
                      </li>
                      <li className="tags__item">
                        <svg width="14" height="14" aria-hidden="true">
                          <use xlinkHref="#icon-level"></use>
                        </svg>Средний
                      </li>
                    </ul>
                    <button className="btn btn--accent btn--secondary quest-card__btn" type="button">Отменить</button>
                  </div>
                </div>
              </div>
          }
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default MyQuestsPage;
