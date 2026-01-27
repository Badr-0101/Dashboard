import { configureStore } from '@reduxjs/toolkit';
import activeMenuReducer from './activeMenuSlice';
import themeReducer from './themeSlice';
export const store = configureStore({
  reducer: {
    activeMenuSlice: activeMenuReducer,
    themeSlice: themeReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
