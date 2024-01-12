import React from "react";
import { Row, Col, Card, Container, ListGroup, ListGroupItem } from "react-bootstrap";
import "../assets/css/WeatherCard.css";

const WeatherForecast = ({ forecastData }) => {
	const extractDate = (dt_txt) => {
		const [date, time] = dt_txt.split(" ");
		const [year, month, day] = date.split("-");
		return `${day}/${month}/${year} ${time}`;
	};

	return (
		<Container>
			<h2 className="text-center mb-2 mt-3">Previsioni per i prossimi giorni</h2>
			<Row xs={5}>
				{forecastData.map((dayForecast, index) => (
					<Col key={index}>
						<Card className="my-3 weather-card5">
							<Card.Body>
								<Card.Title>Data: {extractDate(dayForecast.dt_txt)}</Card.Title>
								<img src={`http://openweathermap.org/img/w/${dayForecast.weather[0].icon}.png`} alt="Weather icon" />
								<Card.Text>
									<ListGroup className="custom-list">
										<ListGroupItem>Max: {dayForecast.main.temp_max}°C</ListGroupItem>
										<ListGroupItem>Min: {dayForecast.main.temp_min}°C</ListGroupItem>
										<ListGroupItem>
											{/* Condizioni: {dayForecast.weather[0].description}
											<br /> */}
										</ListGroupItem>
										<ListGroupItem>
											Umidità: {dayForecast.main.humidity}%<br />
											Pressione: {dayForecast.main.pressure} hPa
										</ListGroupItem>

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
		</Container>
	);
};

export default WeatherForecast;
