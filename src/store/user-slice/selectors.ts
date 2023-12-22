import { State } from '../../types/types';
import { SliceNameSpace } from '../../const/const';

export const getAutorisationStatus = (state: State) => state[SliceNameSpace.User].authorizationStatus;
export const getUserInfo = (state: State) => state[SliceNameSpace.User].user;
export const getLoginErrorStatus = (state: State) => state[SliceNameSpace.User].loginStatus.rejected;
export const getLoginProcessStatus = (state: State) => state[SliceNameSpace.User].loginStatus.pending;
