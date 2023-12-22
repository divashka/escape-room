import { combineReducers } from '@reduxjs/toolkit';
import { SliceNameSpace } from '../const/const';
import { questReducer } from './quest-slice/quest-slice';
import { userReducer } from './user-slice/user-slice';
import { reservationReducer } from './reservation-slice/reservation-slice';

export const rootReducer = combineReducers({
  [SliceNameSpace.Quest]: questReducer.reducer,
  [SliceNameSpace.User]: userReducer.reducer,
  [SliceNameSpace.Reservation]: reservationReducer.reducer,
});
