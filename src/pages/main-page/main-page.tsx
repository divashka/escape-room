import { useState } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import QuestCards from '../../components/quest-cards/quest-cards';
import { useAppSelector } from '../../hooks';
import { getQuests } from '../../store/quest-slice/selectors';
import { FilterSubjectItems, FilterLevelLabels, FilterSubjectDefault, FilterLevelDefault } from '../../const/const';
import { TypeQuest, LevelQuest } from '../../types/types';

function MainPage(): JSX.Element {

  const [activeFilterSubjectItem, setActiveFilterSubjectItem] = useState<TypeQuest | null>(null);

  const [activeFilterLevelItem, setActiveFilterLevelItem] = useState<LevelQuest | null>(null);

  const quests = useAppSelector(getQuests);

  let filteredSubjectQuests = quests.filter((quest) => quest.type === activeFilterSubjectItem);

  if (activeFilterSubjectItem === null) {
    filteredSubjectQuests = quests;
  }

  let filteredLevelQuests = filteredSubjectQuests.filter((quest) => quest.level === activeFilterLevelItem);

  if (activeFilterLevelItem === null) {
    filteredLevelQuests = filteredSubjectQuests;
  }

  function handleFilterSubjectChange(type: TypeQuest | null) {
    setActiveFilterSubjectItem(type);
  }

  function handleFilterLevelChange(type: LevelQuest | null) {
    setActiveFilterLevelItem(type);
  }

  return (
    <div className="wrapper">
      <Header></Header>

      <main className="page-content">
        <div className="container">
          <div className="page-content__title-wrapper">
            <h1 className="subtitle page-content__subtitle">квесты в Санкт-Петербурге
            </h1>
            <h2 className="title title--size-m page-content__title">Выберите тематику</h2>
          </div>
          <div className="page-content__item">
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
                      checked={activeFilterSubjectItem === null}
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
                        checked={activeFilterSubjectItem === type}
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
                      checked={activeFilterLevelItem === null}
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
                        checked={activeFilterLevelItem === type}
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
          </div>
          <h2 className="title visually-hidden">Выберите квест</h2>
          <QuestCards quests={filteredLevelQuests}></QuestCards>
        </div>
      </main>

      <Footer></Footer>
    </div>
  );
}

export default MainPage;
