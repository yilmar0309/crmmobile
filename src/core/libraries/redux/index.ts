import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import loading from '@/core/slices/loadingSlice';
import {leadsApi} from '@/leads/data/remote/leadsApi';
import {prospectsApi} from '@/prospects/data/remote/prospectsApi';

const store = configureStore({
  reducer: {
    loading,
    [leadsApi.reducerPath]: leadsApi.reducer,
    [prospectsApi.reducerPath]: prospectsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([leadsApi.middleware, prospectsApi.middleware]),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
export default store;
