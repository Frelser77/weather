import React from "react";
import { Card } from "react-bootstrap";
import "../assets/css/WeatherDetails.css";
import "../assets/css/WeatherCard.css";

const WeatherDetails = ({ weatherData }) => {
	const convertUnixTimeToLocalTime = (unixTime) => {
		const date = new Date(unixTime * 1000);
		const options = { timeZone: "Europe/Rome", hour: "2-digit", minute: "2-digit" };
		return date.toLocaleTimeString("it-IT", options);
	};

	return (
		<Card className="weather-card mx-auto">
			<img
				src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
				className="weather-icon"
				alt="Weather icon"
			/>
			<Card.Body className="text-center mt-2">
				<Card.Title className="city-name ">Meteo per {weatherData.name}</Card.Title>
				<Card.Text>Temperatura: {weatherData.main.temp} °C</Card.Text>
				{/* Informazioni sempre visibili */}
				<div className="weather-details-visible">
					<p className="temperature">Temperatura Percepita: {weatherData.main.feels_like} °C</p>
					<p className="temperature">Umidità: {weatherData.main.humidity}%</p>
				</div>
				{/* Informazioni visibili solo al hover */}
				<div className="weather-details-hover">
					<p>
						Minima: {weatherData.main.temp_min} °C, Massima: {weatherData.main.temp_max} °C
					</p>
					<p>Pressione: {weatherData.main.pressure} hPa</p>
					<p>Condizioni: {weatherData.weather[0].description}</p>
					<p>
						Vento: {weatherData.wind.speed} m/s, Direzione: {weatherData.wind.deg}°
					</p>
				</div>
				<p className="my-2 date">Time: {convertUnixTimeToLocalTime(weatherData.dt)}</p>
			</Card.Body>
		</Card>
	);
};

export default WeatherDetails;
