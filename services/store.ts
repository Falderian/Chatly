import { configureStore } from '@reduxjs/toolkit';

import { authApi } from './Api/authApi';
import userReducer from './slices/userSlice';

export default configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware),
});
