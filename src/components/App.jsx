import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store/index";
import HomePage from "./HomePage";
import CityDetails from "./CityDetails";
import NotFound from "./NotFound";
import Loading from "./Loading";

function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={<Loading />} persistor={persistor}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/details/:city" element={<CityDetails />} />
						<Route path="/*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</PersistGate>
		</Provider>
	);
}

export default App;
