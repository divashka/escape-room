import { BookingQuest } from '../../types/types';
import QuestBookingCard from '../quest-booking-card/quest-booking-card';

type QuestBookingCardsProps = {
  quests: BookingQuest[];
}

function QuestBookingCards({ quests }: QuestBookingCardsProps): JSX.Element {
  return (
    <div className="cards-grid">
      {
        quests.map((quest) => (
          <QuestBookingCard key={quest.id} quest={quest}></QuestBookingCard>)
        )
      }
    </div>
  );
}

export default QuestBookingCards;
