import { combineReducers } from '@reduxjs/toolkit';
import { SliceNameSpace } from '../const/const';
import { questReducer } from './quest-slice/quest-slice';
import { userReducer } from './user-slice/user-slice';
import { reservationReducer } from './reservation-slice/reservation-slice';
import { bookingReducer } from './booking-slice/booking-slice';

export const rootReducer = combineReducers({
  [SliceNameSpace.Quest]: questReducer.reducer,
  [SliceNameSpace.User]: userReducer.reducer,
  [SliceNameSpace.Reservation]: reservationReducer.reducer,
  [SliceNameSpace.Booking]: bookingReducer.reducer,
});
