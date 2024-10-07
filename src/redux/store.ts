import { configureStore } from "@reduxjs/toolkit";
import initialLoadSliceReducer from "./slice/initialLoadSlice";
export const store = configureStore({
    reducer: {
        handleInitialState: initialLoadSliceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
