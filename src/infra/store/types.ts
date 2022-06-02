import { store } from './store';

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ReturnType<typeof store.dispatch>;
