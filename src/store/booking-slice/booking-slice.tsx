
import { createSlice } from '@reduxjs/toolkit';
import { BookingSlice } from '../../types/types';
import { SliceNameSpace } from '../../const/const';
import { fetchInfoBookingQuest } from '../api-actions';

const initialState: BookingSlice = {
  infoBookingQuest: [],
};

export const bookingReducer = createSlice({
  name: SliceNameSpace.Booking,
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchInfoBookingQuest.fulfilled, (state, action) => {
        state.infoBookingQuest = action.payload;
      });
  }
});
