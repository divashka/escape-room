import { State } from '../../types/types';
import { SliceNameSpace } from '../../const/const';

export const getQuests = (state: State) => state[SliceNameSpace.Quest].quests;
export const getOneQuest = (state: State) => state[SliceNameSpace.Quest].oneQuest;
export const getStatusOneQuestLoading = (state: State) => state[SliceNameSpace.Quest].isOneQuestLoading;
export const getStatusQuestsLoading = (state: State) => state[SliceNameSpace.Quest].isQuestsLoading;
export const getErrorOneQuestStatus = (state: State) => state[SliceNameSpace.Quest].hasErrorOneQuest;
export const getErrorQuestsStatus = (state: State) => state[SliceNameSpace.Quest].hasErrorQuests;
