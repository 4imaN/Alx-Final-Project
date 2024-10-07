import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    initialLoad: true,
};
export const initialLoadStateSlice = createSlice({
    name: "initialLoadState",
    initialState,
    reducers: {
        handleInitialState: (state) => {
            state.initialLoad = state.initialLoad = false;
        },
    },
});

export const { handleInitialState } = initialLoadStateSlice.actions;
export default initialLoadStateSlice.reducer;
