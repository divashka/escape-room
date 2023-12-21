import { createSlice } from '@reduxjs/toolkit';
import { ReservationSlice } from '../../types/types';
import { SliceNameSpace } from '../../const/const';
import { fetchBookingQuests, fetchBookQuest } from '../api-actions';

const initialState: ReservationSlice = {
  bookingQuests: []
};

export const reservationReducer = createSlice({
  name: SliceNameSpace.Reservation,
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBookingQuests.fulfilled, (state, action) => {
        state.bookingQuests = action.payload;
      })
      .addCase(fetchBookQuest.fulfilled, (state, action) => {
        state.bookingQuests.push(action.payload);
      });
  }
});
