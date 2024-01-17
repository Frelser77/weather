import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import "../assets/css/WeatherDetails.css";

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
				<Card.Title className="city-name ms-1 fs-1">{weatherData.name}</Card.Title>
				<Card.Text className="fs-1 mt-1">{Math.floor(weatherData.main.temp)} °C</Card.Text>
				{/* Informazioni sempre visibili */}
				<Row>
					{/* Informazioni sempre visibili */}
					<Col sm={6} className="text-center">
						<p className="fs-3"> Perc. {Math.floor(weatherData.main.feels_like)} °C</p>
					</Col>
					<Col sm={6} className="text-center">
						<p className="fs-3">Umidity: {Math.floor(weatherData.main.humidity)}%</p>
					</Col>
				</Row>

				{/* Informazioni visibili solo al hover */}
				<Row>
					<Col sm={6} className="text-center">
						<p className="fs-4">
							Min: {Math.floor(weatherData.main.temp_min)}°C Max: {Math.floor(weatherData.main.temp_max)} °C
						</p>
					</Col>
					<Col sm={6} className="text-center">
						<p className="fs-4">Condition: {weatherData.weather[0].description}</p>
					</Col>
					<Col>
						<p className="fs-5">
							Wind: {Math.floor(weatherData.wind.speed)} m/s, Direction: {Math.floor(weatherData.wind.deg)}°
						</p>
						<p className="fs-3">Pressure: {weatherData.main.pressure} hPa</p>
					</Col>
				</Row>
				<p className="my-2 date">Time: {convertUnixTimeToLocalTime(weatherData.dt)}</p>
			</Card.Body>
		</Card>
	);
};

export default WeatherDetails;
