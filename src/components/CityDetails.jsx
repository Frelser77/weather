import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import WeatherDetails from "./WeatherDetails";
import LoadingSpinner from "./Loading";
import WeatherForecast from "./WeatherForecast";
import Alert from "react-bootstrap/Alert";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetails, fetchForecast, toggleForecast } from "../redux/slice/detailsSlice";
import getBackgroundImage from "./BackGroundImg";
import { changeBackground } from "../redux/slice/backgroundSlice";

const CityDetails = () => {
	const { city } = useParams();
	const dispatch = useDispatch();
	const weather = useSelector((state) => state.weather.currentWeather);
	const forecast = useSelector((state) => state.weather.forecast);
	console.log(forecast);
	const status = useSelector((state) => state.weather.status);
	const error = useSelector((state) => state.weather.error);
	const showForecast = useSelector((state) => state.weather.showForecast);

	useEffect(() => {
		if (city) {
			dispatch(fetchDetails(city));
			dispatch(fetchForecast(city));
		}
	}, [city, dispatch]);

	useEffect(() => {
		if (weather && weather.weather && weather.weather.length > 0) {
			const weatherMain = weather.weather[0].main;
			const newBackgroundImage = getBackgroundImage(weatherMain);
			document.body.style.backgroundImage = newBackgroundImage;
			dispatch(changeBackground(newBackgroundImage));
		} else {
			// Se weather è null o non ha dati meteo validi, reimposta lo sfondo predefinito
			dispatch(changeBackground("url(/img/bg-default.png)"));
		}
	}, [weather, dispatch]);

	if (status === "loading") {
		return <LoadingSpinner />;
	}

	if (error) {
		return (
			<Alert variant="danger" dismissible>
				{error}
			</Alert>
		);
	}

	return (
		<>
			<NavBar selectedCity={city} />
			<h1 className="text-center my-4 fw-bold title">Weather details for {city}</h1>
			{status === "succeeded" && weather && (
				<>
					<WeatherDetails weatherData={weather} />
					<div className="d-flex justify-content-center align-items-center">
						<Button onClick={() => dispatch(toggleForecast())} className="my-4 btn-dark">
							{showForecast ? "Nascondi Previsioni" : "Mostra Previsioni"}
						</Button>
						<NavLink role="button" to="/" className="btn btn-dark my-3 mx-2">
							Home
						</NavLink>
					</div>
					{showForecast && forecast && <WeatherForecast forecastData={forecast} />}
				</>
			)}
		</>
	);
};

export default CityDetails;
