import React, { useState, useEffect } from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import NavBar from "./NavBar";
import "../assets/css/WeatherCard.css";
import { NavLink } from "react-router-dom";
import Favorites from "./Favorites";

const HomePage = () => {
	const [currentWeather, setCurrentWeather] = useState(null);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(async (position) => {
			const { latitude, longitude } = position.coords;
			const apiKey = "079445cf5d0c05445f2d4777eb42f149";
			const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

			try {
				const response = await fetch(url);
				const data = await response.json();
				setCurrentWeather(data);
			} catch (error) {
				console.error("Errore durante il fetch dei dati meteo:", error);
			}
		});
	}, []);

	const convertUnixTimeToLocalTime = (unixTime) => {
		const date = new Date(unixTime * 1000);
		const options = { timeZone: "Europe/Rome", hour: "2-digit", minute: "2-digit" };
		return date.toLocaleTimeString("it-IT", options);
	};

	const [favorites, setFavorites] = useState(() => {
		const savedFavorites = localStorage.getItem("favorites");
		return savedFavorites ? JSON.parse(savedFavorites) : [];
	});

	useEffect(() => {
		localStorage.setItem("favorites", JSON.stringify(favorites));
	}, [favorites]);

	const addFavorite = (cityName, lat, lon) => {
		const newFavorite = { cityName, lat, lon };
		setFavorites([...favorites, newFavorite]);
	};

	const removeFavorite = (index) => {
		const newFavorites = favorites.filter((_, i) => i !== index);
		setFavorites(newFavorites);
		localStorage.setItem("favorites", JSON.stringify(newFavorites));
	};

	return (
		<>
			<NavBar />
			{currentWeather && (
				<Container>
					<Row className="justify-content-center m-auto">
						<Col md={6} lg={4}>
							<NavLink to={`/details/${currentWeather.name}`} className="nav-link">
								<Card className="text-center weather-card my-5">
									<Card.Body>
										<Card.Title>
											<img
												className="weather-icon"
												src={`http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`}
												alt="Weather icon"
											/>
											<h1 className="name-hover city-name">{currentWeather.name}</h1>
										</Card.Title>
										<Card.Text>
											<ListGroup variant="flush" className="custom-list">
												<ListGroup.Item className="celsius">{currentWeather.main.temp.toFixed(0)}°C</ListGroup.Item>
												<ListGroup.Item>Alba: {convertUnixTimeToLocalTime(currentWeather.sys.sunrise)}</ListGroup.Item>
												<ListGroup.Item>
													Tramonto: {convertUnixTimeToLocalTime(currentWeather.sys.sunset)}
												</ListGroup.Item>
												<ListGroup.Item>Temperatura Percepita: {currentWeather.main.feels_like} °C</ListGroup.Item>
												<ListGroup.Item>Condizioni: {currentWeather.weather[0].description}</ListGroup.Item>
											</ListGroup>
										</Card.Text>
									</Card.Body>
									<Card.Footer className="text-light date">
										Aggiornamento: {convertUnixTimeToLocalTime(currentWeather.dt)}
									</Card.Footer>
								</Card>
							</NavLink>
						</Col>
					</Row>
				</Container>
			)}
			<Favorites favorites={favorites} onAddFavorite={addFavorite} onRemoveFavorite={removeFavorite} />
		</>
	);
};

export default HomePage;
