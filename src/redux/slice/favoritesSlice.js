// src/redux/slice/favoritesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addFavoriteAsync = createAsyncThunk(
	"favorites/addFavorite",
	async ({ cityName, lat, lon }, { rejectWithValue }) => {
		const apiKey = "079445cf5d0c05445f2d4777eb42f149";
		const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

		try {
			const response = await fetch(weatherUrl);
			const weatherData = await response.json();
			if (!response.ok) {
				throw new Error(weatherData.message || "Errore durante il fetch dei dati meteo");
			}

			// Estrai i dati rilevanti da weatherData e ritornali
			const favorite = {
				cityName,
				lat,
				lon,
				temp: weatherData.main.temp,
				feels_like: weatherData.main.feels_like,
				condition: weatherData.weather[0].description,
				icon: weatherData.weather[0].icon,
			};

			return favorite;
		} catch (error) {
			// Se c'è un errore, passa il valore di rifiuto con la funzione rejectWithValue
			return rejectWithValue(error.message || "Errore durante il fetch dei dati meteo");
		}
	}
);

const favoritesSlice = createSlice({
	name: "favorites",
	initialState: {
		favorites: [],
	},
	reducers: {
		addFavorite: (state, action) => {
			state.favorites.push(action.payload);
		},
		removeFavorite: (state, action) => {
			state.favorites = state.favorites.filter((_, index) => index !== action.payload);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(addFavoriteAsync.fulfilled, (state, action) => {
			// Aggiungi il nuovo preferito all'array di preferiti nello stato
			state.favorites.push(action.payload);
		});
	},
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
