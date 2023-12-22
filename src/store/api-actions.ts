import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute } from '../const/const';
import { Quest, QuestFull, State, AppDispatch, UserData, AuthData, BookingQuest, infoBookingQuest, BookQuestData } from '../types/types';
import { saveToken, dropToken } from '../services/token';
import { redirectToRoute } from './actions';

export const fetchQuestsAction = createAsyncThunk<Quest[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'quest/fetchQuests',
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
  'quest/fetchQuest',
  async (id, { extra: api }) => {
    const { data } = await api.get<QuestFull>(`${APIRoute.Quest}/${id}`);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    await api.get<AuthData>(APIRoute.Login);
  },
);

export const loginAction = createAsyncThunk<AuthData, UserData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ email: email, password }, { extra: api }) => {
    const { data } = await api.post<AuthData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export const fetchBookingQuests = createAsyncThunk<BookingQuest[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'reservation/fetchBookingQuests',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<BookingQuest[]>(APIRoute.Reservation);
    return data;
  },
);

export const fetchCancelReservedQuest = createAsyncThunk<BookingQuest, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'reservation/fetchCancelReservedQuest',
  async (id, { extra: api }) => {
    const { data } = await api.delete<BookingQuest>(`${APIRoute.Reservation}/${id}`);
    return data;
  },
);

export const fetchInfoBookingQuest = createAsyncThunk<infoBookingQuest[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'booking/fetchInfoBookingQuest',
  async (id, { extra: api }) => {
    const { data } = await api.get<infoBookingQuest[]>(`${APIRoute.Quest}/${id}/booking`);
    return data;
  },
);

export const fetchBookQuest = createAsyncThunk<BookingQuest, BookQuestData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'booking/fetchBookQuest',
  async (arg, { dispatch, extra: api }) => {
    const { data } = await api.post<BookingQuest>(`${APIRoute.Quest}/${arg.id}/booking`, arg.data);
    dispatch(redirectToRoute(AppRoute.MyQuests));
    return data;
  },
);


