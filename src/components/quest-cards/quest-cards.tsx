import { memo } from 'react';
import QuestCard from '../quest-card/quest-card';
import { Quest } from '../../types/types';

type QuestCardsProps = {
  quests: Quest[];
}

function QuestCardsComponent({ quests }: QuestCardsProps): JSX.Element {
  return (
    <div className="cards-grid">
      {
        quests.map((quest) => (
          <QuestCard key={quest.id} quest={quest}></QuestCard>)
        )
      }
    </div>
  );
}

const QuestCards = memo(QuestCardsComponent);

export default QuestCards;
