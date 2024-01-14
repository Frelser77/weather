import React, { useState, useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";

const FavoriteWeatherCard = ({ lat, lon }) => {
	const [weatherData, setWeatherData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const apiKey = "079445cf5d0c05445f2d4777eb42f149";
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

		const fetchWeather = async () => {
			try {
				const response = await fetch(url);
				if (!response.ok) throw new Error("Weather data fetch failed");
				const data = await response.json();
				setWeatherData(data);
				setLoading(false);
			} catch (error) {
				setError(error.message);
				setLoading(false);
			}
		};

		fetchWeather();
	}, [lat, lon]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<Card className="weather-card">
			<Card.Body>
				<Card.Title>{weatherData.name || "Città Preferita"}</Card.Title>
				<ListGroup variant="flush">
					<ListGroup.Item>Temperatura: {weatherData.main.temp.toFixed(1)}°C</ListGroup.Item>
					<ListGroup.Item>Temperatura percepita: {weatherData.main.feels_like.toFixed(1)}°C</ListGroup.Item>
					<ListGroup.Item>Condizioni: {weatherData.weather[0].description}</ListGroup.Item>
					<ListGroup.Item>Umidità: {weatherData.main.humidity}%</ListGroup.Item>
					<ListGroup.Item>Pressione: {weatherData.main.pressure} hPa</ListGroup.Item>
				</ListGroup>
			</Card.Body>
		</Card>
	);
};

export default FavoriteWeatherCard;
