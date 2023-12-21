import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOneQuestAction, fetchInfoBookingQuest } from '../../store/api-actions';
import { dropQuest } from '../../store/quest-slice/quest-slice';
import { getOneQuest, getStatusQuestsLoading } from '../../store/quest-slice/selectors';
import NotFound from '../not-found-page/not-found-page';
import LoadingPage from '../loading-page/loading-page';
import Map from '../../components/map/map';
import { getInfoBookingQuest } from '../../store/booking-slice/selectors';
import BookingForm from '../../components/booking-form/booking-form';
import { infoBookingQuest } from '../../types/types';

function BookingPage(): JSX.Element {

  const { id } = useParams();

  const [selectedQuest, setSelectedQuest] = useState<infoBookingQuest | undefined>(undefined);

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
  const isLoading = useAppSelector(getStatusQuestsLoading);
  const infoBookingQuests = useAppSelector(getInfoBookingQuest);

  if (infoBookingQuests.length === 0) {
    return <LoadingPage />;
  }

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

  function handleQuestMarkerClick(currentQuest: infoBookingQuest) {
    setSelectedQuest(currentQuest);
  }

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
              <Map quests={infoBookingQuests} onQuestMarkerClick={handleQuestMarkerClick} selectedQuest={selectedQuest}></Map>
              <p className="booking-map__address">Вы&nbsp;выбрали: {selectedQuest?.location.address || infoBookingQuests[0].location.address}</p>
            </div>
          </div>
          <BookingForm quest={quest} quests={infoBookingQuests} selectedQuest={selectedQuest}></BookingForm>
        </div>
      </main >

      <Footer></Footer>
    </div >
  );
}

export default BookingPage;
