import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDetails = createAsyncThunk("details/fetchWeather", async (cityName, { rejectWithValue }) => {
	const apiKey = "079445cf5d0c05445f2d4777eb42f149";
	try {
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
		const response = await fetch(url);
		if (!response.ok) throw new Error("Weather data fetch failed");
		const data = await response.json();
		return data;
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

export const fetchForecast = createAsyncThunk("details/fetchForecast", async (cityName, { rejectWithValue }) => {
	const apiKey = "079445cf5d0c05445f2d4777eb42f149";
	try {
		const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;
		const response = await fetch(url);
		if (!response.ok) throw new Error("Forecast data fetch failed");
		const data = await response.json();
		return data.list;
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

const initialState = {
	weather: null,
	forecast: null,
	status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
	error: null,
	showForecast: false,
};

const detailsSlice = createSlice({
	name: "details",
	initialState,
	reducers: {
		toggleForecast: (state) => {
			state.showForecast = !state.showForecast;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDetails.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchDetails.fulfilled, (state, action) => {
				state.status = "succeeded";
				if (action.payload) {
					state.weather = action.payload;
				}
			})
			.addCase(fetchDetails.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			})
			.addCase(fetchForecast.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchForecast.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.forecast = action.payload;
			})
			.addCase(fetchForecast.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			});
	},
});

export const { toggleForecast } = detailsSlice.actions;
export default detailsSlice.reducer;
