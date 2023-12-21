
import { Link } from 'react-router-dom';
import { BookingQuest } from '../../types/types';
import { AppRoute } from '../../const/const';

type QuestCardProps = {
  quest: BookingQuest;
}

function QuestBookingCard({ quest }: QuestCardProps): JSX.Element {

  const { id, title, previewImg, previewImgWebp, level, peopleMinMax } = quest.quest;

  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source type="image/webp"
            srcSet={`${previewImgWebp}, ${previewImgWebp} 2x`}
          >
          </source>
          <img
            src={previewImg} srcSet={`${previewImg} 2x`} width="344"
            height="232" alt={title}
          />
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link className="quest-card__link" to={`${AppRoute.Quest}${id}`}>{title}</Link>
        </div>
        <ul className="tags quest-card__tags">
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
        <button className="btn btn--accent btn--secondary quest-card__btn" type="button">Отменить</button>
      </div>
    </div>
  );
}

export default QuestBookingCard;
