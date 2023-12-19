import { useEffect } from 'react';
import { fetchOneQuestAction } from '../../store/api-actions';
import { useParams } from 'react-router-dom';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { dropQuest } from '../../store/quest-slice/quest-slice';
import { getErrorOneQuestStatus, getOneQuest, getStatusOneQuestLoading } from '../../store/quest-slice/selectors';
import NotFound from '../not-found-page/not-found-page';
import LoadingPage from '../loading-page/loading-page';
import '../../../markup/css/style.min.css';

function QuestPage(): JSX.Element {

  const { id } = useParams();
  const dispatch = useAppDispatch();

  const quest = useAppSelector(getOneQuest);
  const isLoading = useAppSelector(getStatusOneQuestLoading);
  const hasError = useAppSelector(getErrorOneQuestStatus);

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(fetchOneQuestAction(id));

    return () => {
      dispatch(dropQuest());
    };
  }, [dispatch, id]);

  if (hasError) {
    return <NotFound />;
  }

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!quest) {
    return <NotFound />;
  }

  const { title, type, level, peopleMinMax, description, coverImg, coverImgWebp } = quest;

  return (
    <div className="wrapper">
      <Header></Header>

      <main className="decorated-page quest-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source type="image/webp"
              srcSet={`${coverImgWebp}, ${coverImgWebp} 2x`}
            >
            </source>
            <img
              src={coverImg} srcSet={`${coverImg} 2x`} width="1366"
              height="768"
            />
          </picture>
        </div>
        <div className="container container--size-l">
          <div className="quest-page__content">
            <h1 className="title title--size-l title--uppercase quest-page__title">{title}</h1>
            <p className="subtitle quest-page__subtitle"><span className="visually-hidden">Жанр:</span>{type}
            </p>
            <ul className="tags tags--size-l quest-page__tags">
              <li className="tags__item">
                <svg width="11" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-person"></use>
                </svg>{peopleMinMax[0]}&ndash;{peopleMinMax[1]}&nbsp;чел
              </li>
              <li className="tags__item">
                <svg width="14" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-level"></use>
                </svg>{level}
              </li>
            </ul>
            <p className="quest-page__description">{description}
            </p>
            <a className="btn btn--accent btn--cta quest-page__btn" href="booking.html">Забронировать</a>
          </div>
        </div>
      </main>

      <Footer></Footer>
    </div>
  );
}

export default QuestPage;
