import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Col, Form, Button, Row } from "react-bootstrap";
import FavoritesList from "./FavoriteList";
import { addFavoriteAsync } from "../redux/slice/favoritesSlice";

const Favorites = ({ favorites, onAddFavorite, onRemoveFavorite }) => {
	const [cityName, setCityName] = useState("");
	const dispatch = useDispatch();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const apiKey = "079445cf5d0c05445f2d4777eb42f149";
		const geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;

		try {
			const geoResponse = await fetch(geocodingUrl);
			const geoData = await geoResponse.json();
			if (geoData.length === 0) {
				throw new Error("City not found");
			}

			const { lat, lon } = geoData[0];
			dispatch(addFavoriteAsync({ cityName, lat, lon }));
			setCityName("");
		} catch (error) {
			console.error("Errore durante la geocodifica della città:", error);
		}
	};

	const removeFavorite = (index) => {
		dispatch(removeFavorite(index));
	};

	return (
		<>
			<Row xs={1}>
				<Col className="mx-auto">
					<Form onSubmit={handleSubmit} className="mb-4 my-bg p-3 rounded">
						<Form.Group controlId="formCityName">
							<Form.Label className="fw-bold fs-3 text-light">Search City to add on favorites</Form.Label>
							<Form.Control
								type="text"
								placeholder="City name"
								value={cityName}
								onChange={(e) => setCityName(e.target.value)}
							/>
						</Form.Group>

						<Button variant="dark" type="submit" className="mt-2">
							Add Favorites
						</Button>
					</Form>
				</Col>
				<Row xs={1} md={2} lg={2} xl={3} className="mx-auto my-scroll-zone d-md-flex d-md-nowrap d-xl-wrap">
					<FavoritesList favorites={favorites} onRemoveFavorite={removeFavorite} />
				</Row>
			</Row>
		</>
	);
};

export default Favorites;
