import { State } from '../../types/types';
import { SliceNameSpace } from '../../const/const';

export const getInfoBookingQuest = (state: State) => state[SliceNameSpace.Booking].infoBookingQuest;
