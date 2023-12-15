import { createSlice } from '@reduxjs/toolkit';
import { QuestSlice } from '../../types/types';
import { SliceNameSpace } from '../../const/const';
import { fetchQuestsAction, fetchOneQuestAction } from '../api-actions';

const initialState: QuestSlice = {
  quests: [],
  oneQuest: null,
  isOneQuestLoading: false,
};

export const questReducer = createSlice({
  name: SliceNameSpace.Quest,
  initialState,
  reducers: {
    dropQuest: (state) => {
      state.oneQuest = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchQuestsAction.fulfilled, (state, action) => {
        state.quests = action.payload;
      })
      .addCase(fetchOneQuestAction.fulfilled, (state, action) => {
        state.oneQuest = action.payload;
        state.isOneQuestLoading = false;
      })
      .addCase(fetchOneQuestAction.pending, (state) => {
        state.isOneQuestLoading = true;
      })
      .addCase(fetchOneQuestAction.rejected, (state) => {
        state.isOneQuestLoading = false;
      });
  }
});

export const { dropQuest } = questReducer.actions;
