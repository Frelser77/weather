import React, { useState } from "react";
import { Row, Col, Card, Container, ListGroup, ListGroupItem, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "../assets/css/WeatherCard.css";
const WeatherForecast = ({ forecastData }) => {
	const [visibleForecasts, setVisibleForecasts] = useState(5);
	const [showMoreClicked, setShowMoreClicked] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const handleShowMore = () => {
		setVisibleForecasts(visibleForecasts + 5);
		setShowMoreClicked(true);

		if (visibleForecasts + 5 >= forecastData.length) {
			setShowModal(true);
		}
	};

	const handleShowLess = () => {
		setVisibleForecasts((0, visibleForecasts - 5));
		if (visibleForecasts - 5 <= 5) {
			setShowMoreClicked(false);
		}
	};

	const extractDate = (dt_txt) => {
		const [date, time] = dt_txt.split(" ");
		const [year, month, day] = date.split("-");
		return `${day}/${month}/${year} ${time}`;
	};

	return (
		<Container>
			<h2 className="text-center mb-2 mt-3 text-light">Previsioni per i prossimi giorni</h2>
			{showMoreClicked && (
				<div className="text-end">
					<Button variant="light" onClick={handleShowLess}>
						<FontAwesomeIcon icon={faTimes} /> Mostra di meno
					</Button>
				</div>
			)}
			<Row xs={1} md={3} xl={5}>
				{forecastData.slice(0, visibleForecasts).map((dayForecast, index) => (
					<Col key={index}>
						<Card className="my-3 weather-card5">
							<Card.Body>
								<Card.Title>Data: {extractDate(dayForecast.dt_txt)}</Card.Title>
								<img
									src={`http://openweathermap.org/img/w/${dayForecast.weather[0].icon}.png`}
									alt="Weather icon"
									className="weather-icon2"
								/>
								<Card.Text>
									<ListGroup className="custom-list">
										<ListGroupItem>Max: {dayForecast.main.temp_max}°C</ListGroupItem>
										<ListGroupItem>Min: {dayForecast.main.temp_min}°C</ListGroupItem>
										{/* <ListGroupItem>Condizioni: {dayForecast.weather[0].description}</ListGroupItem> */}
										<ListGroupItem>Umidità: {dayForecast.main.humidity}%</ListGroupItem>

										<ListGroupItem>
											Vento: {dayForecast.wind.speed} m/s, Direzione: {dayForecast.wind.deg}°<br />
											Prob. Pioggia: {(dayForecast.pop * 100).toFixed(0)}%
										</ListGroupItem>
										{/* altre informazioni */}
									</ListGroup>
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
			{visibleForecasts < forecastData.length && (
				<div className="text-center mt-4">
					<Button variant="dark" onClick={handleShowMore}>
						Mostra di più
					</Button>
				</div>
			)}
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
