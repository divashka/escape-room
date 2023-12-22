import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReservationSlice, BookingQuest } from '../../types/types';
import { SliceNameSpace } from '../../const/const';
import { fetchBookingQuests, fetchBookQuest, fetchCancelReservedQuest } from '../api-actions';

const initialState: ReservationSlice = {
  bookingQuests: [],
  successCancelReserved: false
};

export const reservationReducer = createSlice({
  name: SliceNameSpace.Reservation,
  initialState,
  reducers: {
    cancelReservation: (state, action: PayloadAction<BookingQuest['id']>) => {
      state.bookingQuests = state.bookingQuests.filter((quest) => quest.id !== action.payload);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBookingQuests.fulfilled, (state, action) => {
        state.bookingQuests = action.payload;
      })
      .addCase(fetchBookQuest.fulfilled, (state, action) => {
        state.bookingQuests.push(action.payload);
      })
      .addCase(fetchCancelReservedQuest.fulfilled, (state) => {
        state.successCancelReserved = true;
      })
      .addCase(fetchCancelReservedQuest.rejected, (state) => {
        state.successCancelReserved = false;
      });
  }
});

export const { cancelReservation } = reservationReducer.actions;
