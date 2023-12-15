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
  Login = '/login'
}

export enum SliceNameSpace {
  Quest = 'QUEST',
  Booking = 'BOOKING',
  Reservation = 'RESERVATION',
  User = 'USER'
}
