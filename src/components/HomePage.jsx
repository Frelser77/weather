import React, { useState, useEffect } from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import NavBar from "./NavBar";
import "../assets/css/WeatherCard.css";
import { NavLink } from "react-router-dom";
import Favorites from "./Favorites";
import getBackgroundImage from "./BackGroundImg";

const HomePage = () => {
	const [currentWeather, setCurrentWeather] = useState(null);
	const [backgroundImage, setBackgroundImage] = useState("");

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

	const addFavorite = async (cityName, lat, lon) => {
		const apiKey = "079445cf5d0c05445f2d4777eb42f149";
		const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

		try {
			const response = await fetch(weatherUrl);
			const weatherData = await response.json();
			console.log(weatherData);
			const newFavorite = {
				cityName,
				lat,
				lon,
				temp: weatherData.main.temp,
				feels_like: weatherData.main.feels_like,
				rain_probability: weatherData.rain ? weatherData.rain["1h"] : 0,
				condition: weatherData.weather[0].description,
				condition_bg: weatherData.weather[0].main,
			};

			setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
		} catch (error) {
			console.error("Errore durante il fetch dei dati meteo per aggiungere ai preferiti:", error);
		}
	};

	const removeFavorite = (index) => {
		const newFavorites = favorites.filter((_, i) => i !== index);
		setFavorites(newFavorites);
		localStorage.setItem("favorites", JSON.stringify(newFavorites));
	};

	useEffect(() => {
		if (currentWeather && currentWeather.weather && currentWeather.weather.length > 0) {
			const weatherMain = currentWeather.weather[0].main;
			const backgroundImage = getBackgroundImage(weatherMain);
			document.body.style.backgroundImage = backgroundImage;
		}
	}, [currentWeather]);

	return (
		<>
			<NavBar />
			{currentWeather && (
				<Container fluid="sm">
					<Row xs={1} xl={2} className="">
						<Col>
							<NavLink to={`/details/${currentWeather.name}`} className="nav-link">
								<Card className="text-center weather-card my-2 mx-auto">
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
											<ListGroup variant="flush" className="custom-list px-5">
												<ListGroup.Item className="celsius">{currentWeather.main.temp.toFixed(0)}°C</ListGroup.Item>
												<ListGroup.Item className="text-start fs-2 ms-4">
													/ ± {Math.floor(currentWeather.main.feels_like)} °C
												</ListGroup.Item>
												<ListGroup.Item className="text-end fs-5 mt-3">
													Alba: {convertUnixTimeToLocalTime(currentWeather.sys.sunrise)}
												</ListGroup.Item>
												<ListGroup.Item className="text-end fs-5">
													Tramonto: {convertUnixTimeToLocalTime(currentWeather.sys.sunset)}
												</ListGroup.Item>
												<ListGroup.Item className="mt-5 fs-4">
													Condizioni: {currentWeather.weather[0].description}
												</ListGroup.Item>
											</ListGroup>
										</Card.Text>
									</Card.Body>
									<Card.Footer className="text-light date">
										Aggiornamento: {convertUnixTimeToLocalTime(currentWeather.dt)}
									</Card.Footer>
								</Card>
							</NavLink>
						</Col>
						<Col className="mt-2">
							<Favorites favorites={favorites} onAddFavorite={addFavorite} onRemoveFavorite={removeFavorite} />
						</Col>
					</Row>
				</Container>
			)}
		</>
	);
};

export default HomePage;
