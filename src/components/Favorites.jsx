import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Favorites = ({ favorites, onAddFavorite }) => {
	const [cityName, setCityName] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		const apiKey = "079445cf5d0c05445f2d4777eb42f149"; // Usa la tua API key
		const geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;

		try {
			const geoResponse = await fetch(geocodingUrl);
			const geoData = await geoResponse.json();
			if (geoData.length === 0) {
				throw new Error("City not found");
			}

			const { lat, lon } = geoData[0];
			onAddFavorite(cityName, lat, lon);
			setCityName("");
		} catch (error) {
			console.error("Errore durante la geocodifica della città:", error);
		}
	};

	return (
		<Container>
			<Row className="justify-content-center">
				<Col md={6}>
					<Form onSubmit={handleSubmit} className="mb-4 bg-dark p-3 rounded opacity">
						<Form.Group controlId="formCityName">
							<Form.Label className="fw-bold fs-3 text-light">Città</Form.Label>
							<Form.Control
								type="text"
								placeholder="Inserisci il nome della città"
								value={cityName}
								onChange={(e) => setCityName(e.target.value)}
							/>
						</Form.Group>

						<Button variant="primary" type="submit" className="mt-2">
							Aggiungi ai Preferiti
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default Favorites;
