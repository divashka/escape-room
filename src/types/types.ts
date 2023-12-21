import { AuthorizationStatus } from '../const/const';
import { store } from '../store/store';

export type BookingDate = 'today' | 'tomorrow';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type LevelQuest = 'easy' | 'medium' | 'hard';

export type TypeQuest = 'adventures' | 'horror' | 'mystic' | 'detective' | 'sci-fi';

export type Location = {
  address: string;
  coords: [number, number];
}

export type Quest = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: LevelQuest;
  type: TypeQuest;
  peopleMinMax: [number, number];
}

export type QuestFull = Quest & {
  description: string;
  coverImg: string;
  coverImgWebp: string;
}

export type infoBookingQuest = {
  id: string;
  location: {
    address: string;
    coords: [number, number];
  };
  slots: BookingSlots;
}

export type BookingSlots = {
  today: [{
    time: string;
    isAvailable: boolean;
  }];
  tomorrow: [{
    time: string;
    isAvailable: boolean;
  }];
}

export type BookingQuest = {
  date: BookingDate;
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  id: string;
  location: Location;
  quest: Quest;
}

export type QuestSlice = {
  quests: Quest[];
  oneQuest: QuestFull | null;
  isOneQuestLoading: boolean;
  hasErrorOneQuest: boolean;
  hasErrorQuests: boolean;
  isQuestsLoading: boolean;
};

export type UserSlice = {
  authorizationStatus: AuthorizationStatus;
  user: AuthData;
};

export type ReservationSlice = {
  bookingQuests: BookingQuest[];
};

export type BookingSlice = {
  infoBookingQuest: infoBookingQuest[];
};

export type AuthData = {
  email: string;
  token: string;
}

export type BookQuestData = {
  id: string;
  data: {
    date: BookingDate;
    time: string;
    contactPerson: string;
    phone: string;
    withChildren: boolean;
    peopleCount: number;
    placeId: string;
  };
}

export type UserData = {
  email: string;
  password: string;
}
