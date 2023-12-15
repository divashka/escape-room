import { combineReducers } from '@reduxjs/toolkit';
import { SliceNameSpace } from '../const/const';
import { questReducer } from './quest-slice/quest-slice';

export const rootReducer = combineReducers({
  [SliceNameSpace.Quest]: questReducer.reducer,
});
