import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Card, Button, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const FavoritesList = ({ favorites, onRemoveFavorite }) => {
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(async (position) => {
			const { latitude, longitude } = position.coords;
			const apiKey = "079445cf5d0c05445f2d4777eb42f149";
			const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

			try {
				const response = await fetch(url);
				const data = await response.json();
				// console.log(data);
			} catch (error) {
				console.error("Errore durante il fetch dei dati meteo:", error);
			}
		});
	}, []);
	console.log(favorites);

	return (
		<>
			{favorites.map((favorite, index) => (
				<NavLink to={`/details/${favorite.cityName}`} className="nav-link name-hover">
					{/* {favorite.cityName} */}

					<Col className="mx-1">
						<Card key={index} className="mb-3 position-relative weather-card my-bg">
							<Card.Body>
								<Button
									variant="danger"
									className="btn-sm position-absolute btn-position"
									onClick={() => onRemoveFavorite(index)}
								>
									<FontAwesomeIcon icon={faTimes} />
								</Button>
								<Card.Title className="text-start">{favorite.cityName}</Card.Title>
								{/* <CardText>gradiCelsius {favorite.main.feels_like}</CardText> */}
								{/* Qui puoi aggiungere la chiamata API per ottenere le condizioni meteo */}
								{/* Mostra i dati meteo come temperatura, condizioni, ecc. */}
							</Card.Body>
						</Card>
					</Col>
				</NavLink>
			))}
		</>
	);
};

export default FavoritesList;
