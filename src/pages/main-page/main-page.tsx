import { Helmet } from 'react-helmet-async';
import { useState, useCallback } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import QuestCards from '../../components/quest-cards/quest-cards';
import { useAppSelector } from '../../hooks';
import { getQuests } from '../../store/quest-slice/selectors';
import { TypeQuest, LevelQuest } from '../../types/types';
import NotFilteredQuests from '../../components/not-filtered-quests/not-filtered-quests';
import FilterQuests from '../../components/filter-quests/filter-quests';

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

  const handleFilterSubjectChange = useCallback((type: TypeQuest | null) => {
    setActiveFilterSubjectItem(type);
  }, []);

  const handleFilterLevelChange = useCallback((type: LevelQuest | null) => {
    setActiveFilterLevelItem(type);
  }, []);

  return (
    <div className="wrapper">
      <Helmet>
        <title>{'Escape Room - Home'}</title>
      </Helmet>
      <Header></Header>

      <main className="page-content">
        <div className="container">
          <div className="page-content__title-wrapper">
            <h1 className="subtitle page-content__subtitle">квесты в Санкт-Петербурге
            </h1>
            <h2 className="title title--size-m page-content__title">Выберите тематику</h2>
          </div>
          <div className="page-content__item">
            <FilterQuests activeFilterSubject={activeFilterSubjectItem} activeFilterLevel={activeFilterLevelItem} onFilterSubjectChange={handleFilterSubjectChange} onFilterLevelChange={handleFilterLevelChange}></FilterQuests>
          </div>
          <h2 className="title visually-hidden">Выберите квест</h2>
          {filteredLevelQuests.length === 0
            ? <NotFilteredQuests></NotFilteredQuests>
            :
            <QuestCards quests={filteredLevelQuests}></QuestCards>}
        </div>
      </main>

      <Footer></Footer>
    </div>
  );
}

export default MainPage;
