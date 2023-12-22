import { memo } from 'react';

function NotFilteredQuestsComponent(): JSX.Element {
  return (
    <p>К сожалению по заданным фильтрам квестов нет, попробуйте поискать ещё</p>
  );
}

const NotFilteredQuests = memo(NotFilteredQuestsComponent);

export default NotFilteredQuests;
