import React, { useState } from "react";
import { Row, Col, Card, Container, ListGroup, ListGroupItem, Button, Modal } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "../assets/css/WeatherDetails.css";
const WeatherForecast = ({ forecastData }) => {
	const [visibleForecasts, setVisibleForecasts] = useState(5);
	// const [showMoreClicked, setShowMoreClicked] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const handleShowMore = () => {
		setVisibleForecasts(visibleForecasts + 5);
		// setShowMoreClicked(true);

		if (visibleForecasts + 5 >= forecastData.length) {
			setShowModal(true);
		}
	};

	// const handleShowLess = () => {
	// 	setVisibleForecasts((0, visibleForecasts - visibleForecasts));
	// 	if (visibleForecasts - 5 <= 5) {
	// 		setShowMoreClicked(false);
	// 	}
	// };

	const extractDate = (dt_txt) => {
		const date = new Date(dt_txt);
		const options = { weekday: "long", hour: "numeric", minute: "numeric" };
		return date.toLocaleDateString("it-IT", options);
	};

	return (
		<Container>
			<h2 className="text-center mb-2 mt-3 text-light">Previsioni per i prossimi giorni</h2>
			{/* {showMoreClicked && (
				<div className="text-end">
					<Button variant="light" onClick={handleShowLess}>
						<FontAwesomeIcon icon={faTimes} />
					</Button>
				</div>
			)} */}
			{visibleForecasts < forecastData.length && (
				<div className="text-end mt-4 mb-2 me-1">
					<Button variant="dark" onClick={handleShowMore}>
						Mostra di più
					</Button>
				</div>
			)}
			<Row xs={1} md={3} xl={5} className="flex-nowrap" style={{ maxHeight: "300", overflowX: "auto" }}>
				{forecastData.slice(0, visibleForecasts).map((dayForecast, index) => (
					<Col key={index} className="">
						<Card className=" weather-card5 h-75">
							<Card.Body>
								<Card.Title className="fs-3">{extractDate(dayForecast.dt_txt)}</Card.Title>
								<img
									src={`http://openweathermap.org/img/w/${dayForecast.weather[0].icon}.png`}
									alt="Weather icon"
									className="weather-icon2"
								/>
								<Card.Text>
									<ListGroup className="custom-list">
										<ListGroupItem>Max: {Math.floor(dayForecast.main.temp_max)}°C</ListGroupItem>
										<ListGroupItem>Min: {Math.floor(dayForecast.main.temp_min)}°C</ListGroupItem>
										{/* <ListGroupItem>Condizioni: {dayForecast.weather[0].description}</ListGroupItem> */}
										<ListGroupItem>Umidità: {Math.floor(dayForecast.main.humidity)}%</ListGroupItem>
										<ListGroupItem>Vento: {Math.floor(dayForecast.wind.speed)} m/s</ListGroupItem>
										<ListGroupItem>Direzione: {Math.floor(dayForecast.wind.deg)}°</ListGroupItem>
										<ListGroupItem>Prob. Pioggia:{Math.floor((dayForecast.pop * 100).toFixed(0))}%</ListGroupItem>
										{/* altre informazioni */}
									</ListGroup>
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>

			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Alert</Modal.Title>
				</Modal.Header>
				<Modal.Body>Non ci sono altre previsioni disponibili.</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowModal(false)}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
};

export default WeatherForecast;
