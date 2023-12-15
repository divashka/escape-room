import QuestCard from '../quest-card/quest-card';
import { Quest } from '../../types/types';

type QuestCardsProps = {
  quests: Quest[];
}

function QuestCards({ quests }: QuestCardsProps): JSX.Element {
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

export default QuestCards;
