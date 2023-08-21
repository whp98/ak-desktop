import { configureStore } from '@reduxjs/toolkit';
import appScreenSlice from '@/renderer/store/slices/appScreenSlice';
import appAkURLSlice from '@/renderer/store/slices/appAkURLSlice';

export const store = configureStore({
  "reducer": {
    "appScreen": appScreenSlice,
    "appAkUrl": appAkURLSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

export default store;
