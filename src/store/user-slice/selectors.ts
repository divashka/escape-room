import { State } from '../../types/types';
import { SliceNameSpace } from '../../const/const';

export const getAutorisationStatus = (state: State) => state[SliceNameSpace.User].authorizationStatus;

export const getUserInfo = (state: State) => state[SliceNameSpace.User].user;
