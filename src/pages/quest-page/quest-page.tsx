import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { fetchOneQuestAction } from '../../store/api-actions';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { dropQuest } from '../../store/quest-slice/quest-slice';
import { getErrorOneQuestStatus, getOneQuest, getStatusOneQuestLoading } from '../../store/quest-slice/selectors';
import NotFound from '../not-found-page/not-found-page';
import LoadingPage from '../loading-page/loading-page';
import { AppRoute } from '../../const/const';

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

  if (!quest && !isLoading) {
    return <LoadingPage />;
  }

  if (!quest && isLoading) {
    return <LoadingPage />;
  }

  if (!quest || !id) {
    return <NotFound />;
  }

  const { title, type, level, peopleMinMax, description, coverImg, coverImgWebp } = quest;

  return (
    <div className="wrapper">
      <Helmet>
        <title>{`Escape Room - ${title}`}</title>
      </Helmet>
      <Header></Header>

      <main className="decorated-page quest-page">
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
              height="768"
              alt={title}
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
            <Link className="btn btn--accent btn--cta quest-page__btn" to={`${AppRoute.Quest}${id}/booking`}>Забронировать</Link>
          </div>
        </div>
      </main>

      <Footer></Footer>
    </div>
  );
}

export default QuestPage;
