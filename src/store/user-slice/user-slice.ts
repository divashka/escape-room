import { createSlice } from '@reduxjs/toolkit';
import { UserSlice } from '../../types/types';
import { AuthorizationStatus, SliceNameSpace } from '../../const/const';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';

const initialState: UserSlice = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: {
    email: '',
    token: ''
  }
};

export const userReducer = createSlice({
  name: SliceNameSpace.User,
  initialState,
  reducers: {
    changeAuthorizationStatus: (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});

export const { changeAuthorizationStatus } = userReducer.actions;
