import { AuthorizationStatus } from '../const/const';

export function checkAuthorizationStatus(status: AuthorizationStatus) {
  return status === AuthorizationStatus.Auth;
}
