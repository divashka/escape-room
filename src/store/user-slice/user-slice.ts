import { createSlice } from '@reduxjs/toolkit';
import { UserSlice } from '../../types/types';
import { AuthorizationStatus, SliceNameSpace } from '../../const/const';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';

const initialState: UserSlice = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: { email: '', token: '' },
  loginStatus: { pending: false, rejected: false, }
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
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
        state.loginStatus.rejected = false;
        state.loginStatus.pending = false;
      })
      .addCase(loginAction.pending, (state) => {
        state.loginStatus.pending = true;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.loginStatus.pending = false;
        state.loginStatus.rejected = true;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});

export const { changeAuthorizationStatus } = userReducer.actions;
