export enum AppRoute {
  Root = '/',
  Login = '/login',
  NotFound = '/not-found',
  Booking = '/booking',
  Contacts = '/contacts',
  Quest = '/quest/',
  MyQuests= '/my-quests'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Quest = '/quest',
  Reservation = '/reservation',
  Login = '/login',
  Logout = '/logout'
}

export enum SliceNameSpace {
  Quest = 'QUEST',
  Booking = 'BOOKING',
  Reservation = 'RESERVATION',
  User = 'USER'
}

export const FilterSubjectItems = [
  {
    label: 'Приключения',
    type: 'adventure',
    icon: 'adventure'
  },
  {
    label: 'Ужасы',
    type: 'horror',
    icon: 'horror'
  },
  {
    label: 'Мистика',
    type: 'mystic',
    icon: 'mystic'
  },
  {
    label: 'Детектив',
    type: 'detective',
    icon: 'detective'
  },
  {
    label: 'Sci-fi',
    type: 'sci-fi',
    icon: 'sci-fi'
  },
];

export const FilterLevelLabels = {
  easy: 'Лёгкий',
  medium: 'Средний',
  hard: 'Сложный',
};

export const FilterLevelDefault = {
  label: 'Любой',
  type: 'any'
};

export const FilterSubjectDefault = {
  label: 'Все квесты',
  type: 'all',
  icon: 'all-quests'
};
