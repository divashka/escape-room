import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const/const';
import { Quest, QuestFull } from '../types/types';
import { State, AppDispatch } from '../types/types';

export const fetchQuestsAction = createAsyncThunk<Quest[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchQuests',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Quest[]>(APIRoute.Quest);
    return data;
  },
);

export const fetchOneQuestAction = createAsyncThunk<QuestFull, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchQuest',
  async (id, { extra: api }) => {
    const { data } = await api.get<QuestFull>(`${APIRoute.Quest}/${id}`);
    return data;
  },
);
