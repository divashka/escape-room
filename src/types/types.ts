import { store } from '../store/store';

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

export type LevelQuest = 'easy' | 'medium' | 'hard';

export type TypeQuest = 'adventures' | 'horror' | 'mystic' | 'detective' | 'sci-fi';

export type QuestSlice = {
  quests: Quest[];
  oneQuest: QuestFull | null;
  isOneQuestLoading: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

