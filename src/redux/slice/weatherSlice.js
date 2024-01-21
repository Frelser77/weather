// src/redux/slice/weatherSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWeather = createAsyncThunk("weather/fetchWeather", async ({ latitude, longitude }, thunkAPI) => {
	const apiKey = "079445cf5d0c05445f2d4777eb42f149";
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
	const response = await fetch(url);
	const data = await response.json();
	return data;
});

export const weatherSlice = createSlice({
	name: "weather",
	initialState: {
		currentWeather: "",
		status: "idle",
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchWeather.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchWeather.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.currentWeather = action.payload;
			})
			.addCase(fetchWeather.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export default weatherSlice.reducer;
