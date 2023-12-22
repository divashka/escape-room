import { memo } from 'react';
import { FilterSubjectItems, FilterLevelLabels, FilterSubjectDefault, FilterLevelDefault } from '../../const/const';
import { TypeQuest, LevelQuest } from '../../types/types';

type FilterQuestsProps = {
  activeFilterSubject: TypeQuest | null;
  activeFilterLevel: LevelQuest | null;
  onFilterSubjectChange: (type: TypeQuest | null) => void;
  onFilterLevelChange: (type: LevelQuest | null) => void;
}

function FilterQuestsComponent({ activeFilterSubject, activeFilterLevel, onFilterSubjectChange, onFilterLevelChange }: FilterQuestsProps): JSX.Element {

  function handleFilterSubjectChange(type: TypeQuest | null) {
    onFilterSubjectChange(type);
  }

  function handleFilterLevelChange(type: LevelQuest | null) {
    onFilterLevelChange(type);
  }

  return (
    <form className="filter" action="#" method="get">
      <fieldset className="filter__section">
        <legend className="visually-hidden">Тематика</legend>
        <ul className="filter__list">
          <li className="filter__item">
            <input
              type="radio"
              name="type"
              id={FilterSubjectDefault.type}
              onChange={() => handleFilterSubjectChange(null)}
              checked={activeFilterSubject === null}
            />
            <label className="filter__label" htmlFor={FilterSubjectDefault.type}>
              <svg className="filter__icon" width="26" height="30" aria-hidden="true">
                <use xlinkHref={`#icon-${FilterSubjectDefault.icon}`}></use>
              </svg><span className="filter__label-text">{FilterSubjectDefault.label}</span>
            </label>
          </li>
          {FilterSubjectItems.map(({ type, label, icon }) => (
            <li
              key={type}
              tabIndex={0}
              className="filter__item"
            >
              <input
                type="radio"
                name="type"
                id={type}
                onChange={() => handleFilterSubjectChange(type as TypeQuest)}
                checked={activeFilterSubject === type}
              >
              </input>
              <label className="filter__label" htmlFor={type}>
                <svg className="filter__icon" width="26" height="30" aria-hidden="true">
                  <use xlinkHref={`#icon-${icon}`}></use>
                </svg><span className="filter__label-text">{label}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      <fieldset className="filter__section">
        <legend className="visually-hidden">Сложность</legend>
        <ul className="filter__list">
          <li key={FilterLevelDefault.type} className="filter__item">
            <input
              type="radio"
              name="level"
              id={FilterLevelDefault.type}
              checked={activeFilterLevel === null}
              onChange={() => handleFilterLevelChange(null)}
            >
            </input>
            <label className="filter__label" htmlFor={FilterLevelDefault.type}><span className="filter__label-text">{FilterLevelDefault.label}</span>
            </label>
          </li>
          {Object.entries(FilterLevelLabels).map(([type, label]) => (
            <li key={type} className="filter__item">
              <input
                type="radio"
                name="level"
                id={type}
                checked={activeFilterLevel === type}
                onChange={() => handleFilterLevelChange(type as LevelQuest)}
              >
              </input>
              <label className="filter__label" htmlFor={type}><span className="filter__label-text">{label}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
    </form>
  );
}

const FilterQuests = memo(FilterQuestsComponent);

export default FilterQuests;
