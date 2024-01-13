import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card, Button, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const FavoritesList = ({ favorites, onRemoveFavorite }) => {
	return (
		<>
			{favorites.map((favorite, index) => (
				<NavLink to={`/details/${favorite.cityName}`} className="nav-link name-hover city-name">
					{/* {favorite.cityName} */}

					<Col className="mx-1">
						<Card key={index} className="mb-3 position-relative">
							<Card.Body>
								<Button
									variant="danger"
									className="btn-sm position-absolute top-0 end-0"
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
