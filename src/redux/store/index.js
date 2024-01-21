import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import rootReducer from "../slice/index";
import { weatherSlice } from "../slice/weatherSlice";

const persistConfig = {
	key: "root",
	storage,
	// weatherSlice,
	// Qui puoi aggiungere altre configurazioni, come la blacklist o la whitelist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	// Qui puoi aggiungere altro codice di configurazione se necessario
	// reducer: rootReducer,
});

export const persistor = persistStore(store);
