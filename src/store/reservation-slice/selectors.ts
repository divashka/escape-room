import { State } from '../../types/types';
import { SliceNameSpace } from '../../const/const';

export const getBookingQuests = (state: State) => state[SliceNameSpace.Reservation].bookingQuests;
