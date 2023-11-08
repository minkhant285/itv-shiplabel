import { configureStore } from '@reduxjs/toolkit';
import customerReducer from '../redux/slicers/customerslice';

export const store = configureStore({
    reducer: {
        customerReducer
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
