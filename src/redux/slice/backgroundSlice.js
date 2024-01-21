// src/redux/slice/backgroundSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const backgroundSlice = createSlice({
	name: "background",
	initialState: {
		backgroundImage: "/img/bg-default.png",
	},
	reducers: {
		changeBackground: (state, action) => {
			state.backgroundImage = action.payload;
		},
	},
});

export const { changeBackground } = backgroundSlice.actions;
export default backgroundSlice.reducer;
