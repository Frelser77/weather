import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Button, Col, CardText } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const FavoritesList = ({ favorites, onRemoveFavorite }) => {
	return (
		<>
			{favorites.map((favorite, index) => (
				<Col key={index} className="mb-5">
					<Card /*key={index}*/ className="position-relative favorite-card my-bg h-100">
						<Button
							variant="danger"
							className="btn-sm position-absolute btn-position"
							onClick={() => onRemoveFavorite(index)}
						>
							<FontAwesomeIcon icon={faTimes} />
						</Button>
						<NavLink to={`/details/${favorite.cityName}`} className="nav-link name-hover">
							<Card.Body>
								<Card.Title className="text-start fs-1">{favorite.cityName}</Card.Title>

								<CardText className="fs-3">{favorite.temp}°C</CardText>
								{/* Qui puoi aggiungere la chiamata API per ottenere le condizioni meteo */}
								<CardText className="fs-4">Percepita: {favorite.feels_like}°C</CardText>
								<CardText className="fs-5">Condizioni: {favorite.condition}</CardText>
								{/* Mostra i dati meteo come temperatura, condizioni, ecc. */}
							</Card.Body>
						</NavLink>
					</Card>
				</Col>
			))}
		</>
	);
};

export default FavoritesList;
