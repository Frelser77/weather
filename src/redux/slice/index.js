import { combineReducers } from "@reduxjs/toolkit";
import backgroundReducer, { changeBackground } from "../slice/backgroundSlice";
import weatherReducer from "../slice/weatherSlice";
import favoritesReducer from "../slice/favoritesSlice";

// Importa altri reducer degli slice qui

const rootReducer = combineReducers({
	// Altri reducer degli slice qui
	background: backgroundReducer,
	weather: weatherReducer,
	favorites: favoritesReducer,
});

export default rootReducer;
