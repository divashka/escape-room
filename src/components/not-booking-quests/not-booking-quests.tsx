import { memo } from 'react';

function NotBookingQuestsComponent(): JSX.Element {
  return (
    <p>Вы ещё не забронировали ни одного квеста</p>
  );
}

const NotBookingQuests = memo(NotBookingQuestsComponent);

export default NotBookingQuests;
