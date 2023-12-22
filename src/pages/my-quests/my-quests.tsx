import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { getBookingQuests } from '../../store/reservation-slice/selectors';
import NotBookingQuests from '../../components/not-booking-quests/not-booking-quests';
import QuestBookingCards from '../../components/quest-booking-cards/quest-booking-cards';

function MyQuestsPage(): JSX.Element {

  const bookingQuests = useAppSelector(getBookingQuests);

  return (
    <div className="wrapper">
      <Helmet>
        <title>{'Escape Room - My quests'}</title>
      </Helmet>
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
              <QuestBookingCards quests={bookingQuests}></QuestBookingCards>
          }
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default MyQuestsPage;
