import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOneQuestAction, fetchInfoBookingQuest } from '../../store/api-actions';
import { dropQuest } from '../../store/quest-slice/quest-slice';
import { getOneQuest, getStatusOneQuestLoading } from '../../store/quest-slice/selectors';
import NotFound from '../not-found-page/not-found-page';
import LoadingPage from '../loading-page/loading-page';
import Map from '../../components/map/map';
import { getInfoBookingQuest } from '../../store/booking-slice/selectors';

function BookingPage(): JSX.Element {

  const { id } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(fetchOneQuestAction(id));
    dispatch(fetchInfoBookingQuest(id));

    return () => {
      dispatch(dropQuest());
    };
  }, [dispatch, id]);

  const quest = useAppSelector(getOneQuest);
  const isLoading = useAppSelector(getStatusOneQuestLoading);
  const infoBookingQuest = useAppSelector(getInfoBookingQuest);

  if (infoBookingQuest.length === 0) {
    return <LoadingPage />;
  }

  const { location, slots } = infoBookingQuest[0];

  const { today, tomorrow } = slots;

  const renderedToday = today.slice(0,5);
  const renderedTommorow = tomorrow.slice(0,5);

  if (!quest && !isLoading) {
    return <LoadingPage />;
  }

  if (!quest && isLoading) {
    return <LoadingPage />;
  }

  if (!quest || !id) {
    return <NotFound />;
  }

  const { title, coverImg, coverImgWebp } = quest;

  return (
    <div className="wrapper">
      <Header></Header>

      <main className="page-content decorated-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source type="image/webp"
              srcSet={`${coverImgWebp}, ${coverImgWebp} 2x`}
            >
            </source>
            <img
              src={coverImg}
              srcSet={`${coverImg} 2x`}
              width="1366"
              height="1959"
              alt=""
            />
          </picture>
        </div>
        <div className="container container--size-s">
          <div className="page-content__title-wrapper">
            <h1 className="subtitle subtitle--size-l page-content__subtitle">Бронирование квеста
            </h1>
            <p className="title title--size-m title--uppercase page-content__title">{title}</p>
          </div>
          <div className="page-content__item">
            <div className="booking-map">
              <Map location={location}></Map>
              <p className="booking-map__address">Вы&nbsp;выбрали: {location.address}</p>
            </div>
          </div>
          <form className="booking-form" action="https://echo.htmlacademy.ru/" method="post">
            <fieldset className="booking-form__section">
              <legend className="visually-hidden">Выбор даты и времени</legend>
              <fieldset className="booking-form__date-section">
                <legend className="booking-form__date-title">Сегодня</legend>
                <div className="booking-form__date-inner-wrapper">
                  {renderedToday.map((slot) => (
                    <label key={slot.time} className="custom-radio booking-form__date">
                      <input type="radio" id={`today${slot.time}`} name="date" required value={`today${slot.time}`} disabled={slot.isAvailable === true}/>
                      <span className="custom-radio__label">{slot.time}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset className="booking-form__date-section">
                <legend className="booking-form__date-title">Завтра</legend>
                <div className="booking-form__date-inner-wrapper">
                  {renderedTommorow.map((slot)=> (
                    <label key={slot.time} className="custom-radio booking-form__date">
                      <input type="radio" id={`tomorrow${slot.time}`} name="date" required value={`tomorrow${slot.time}`} disabled={slot.isAvailable === true} />
                      <span
                        className="custom-radio__label"
                      >{slot.time}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </fieldset>
            <fieldset className="booking-form__section">
              <legend className="visually-hidden">Контактная информация</legend>
              <div className="custom-input booking-form__input">
                <label className="custom-input__label" htmlFor="name">Ваше имя</label>
                <input type="text" id="name" name="name" placeholder="Имя" required
                  pattern="[А-Яа-яЁёA-Za-z'- ]{1,}"
                />
              </div>
              <div className="custom-input booking-form__input">
                <label className="custom-input__label" htmlFor="tel">Контактный телефон</label>
                <input type="tel" id="tel" name="tel" placeholder="Телефон" required pattern="[0-9]{10,}" />
              </div>
              <div className="custom-input booking-form__input">
                <label className="custom-input__label" htmlFor="person">Количество участников</label>
                <input type="number" id="person" name="person" placeholder="Количество участников" required />
              </div>
              <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
                <input type="checkbox" id="children" name="children"></input>
                <span className="custom-checkbox__icon">
                  <svg width="20" height="17" aria-hidden="true">
                    <use xlinkHref="#icon-tick"></use>
                  </svg>
                </span><span className="custom-checkbox__label">Со&nbsp;мной будут дети</span>
              </label>
            </fieldset>
            <button className="btn btn--accent btn--cta booking-form__submit" type="submit">Забронировать</button>
            <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
              <input type="checkbox" id="id-order-agreement" name="user-agreement" required />
              <span
                className="custom-checkbox__icon"
              >
                <svg width="20" height="17" aria-hidden="true">
                  <use xlinkHref="#icon-tick"></use>
                </svg>
              </span>
              <span className="custom-checkbox__label">Я&nbsp;согласен с
                <a className="link link--active-silver link--underlined" href="#">правилами обработки персональных
                  данных
                </a>&nbsp;и пользовательским соглашением
              </span>
            </label>
          </form>
        </div>
      </main >

      <Footer></Footer>
    </div >
  );
}

export default BookingPage;
