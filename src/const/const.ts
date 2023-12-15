export enum AppRoute {
  Root = '/',
  Login = '/login',
  NotFound = '/not-found',
  Booking = '/booking',
  Contacts = '/contacts',
  Quest = '/quest/:id',
  MyQuests= '/my-quests'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}


