import { State } from '../../types/types';
import { SliceNameSpace } from '../../const/const';

export const getBookingQuests = (state: State) => state[SliceNameSpace.Reservation].bookingQuests;
export const getBookingQuestStatus = (state: State) => state[SliceNameSpace.Reservation].bookingStatus.pending;
export const getErrorBookingQuestStatus = (state: State) => state[SliceNameSpace.Reservation].bookingStatus.rejected;
export const getInfoBookingQuest = (state: State) => state[SliceNameSpace.Reservation].infoBookingQuest;
