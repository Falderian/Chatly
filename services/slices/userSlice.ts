import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../../types/userTypes';

type User = { profile: TUser | null; token: string | null };

const initialState: User = { profile: null, token: null };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.profile = action.payload.profile;
      state.token = action.payload.token;
    },
    clearUser(state) {
      state.profile = null;
      state.token = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
