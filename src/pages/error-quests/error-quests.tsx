import { fetchQuestsAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';
import './error-quests.css';

function ErrorQuestsPage(): JSX.Element {

  const dispatch = useAppDispatch();

  return (
    <div className="wrapper">
      <main className="page-content">
        <div className="container">
          <div className="error__wrapper">
            <h1 className="title title--size-m page-content__title">Произошла ошибка загрузки данных</h1>
            <button
              className="error__button button"
              onClick={() => {
                dispatch(fetchQuestsAction());
              }}
            >
              Попробовать ещё раз
            </button>
          </div>
        </div>
      </main>

    </div>
  );
}

export default ErrorQuestsPage;
