import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button, Alert, Container } from "react-bootstrap";

const NavBar = ({ selectedCity }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [showAlert, setShowAlert] = useState(false);
	const [alertMsg, setAlertMsg] = useState("");
	const navigate = useNavigate();

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
		setShowAlert(false);
	};

	const handleSearchSubmit = async (event) => {
		event.preventDefault();
		const apiKey = "079445cf5d0c05445f2d4777eb42f149";
		try {
			const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}`);
			if (response.ok) {
				const data = await response.json();
				// console.log(data);
				navigate(`/details/${searchTerm}`);
			} else {
				switch (response.status) {
					case 404:
						setAlertMsg("Città non trovata. Si prega di riprovare.");
						break;
					case 500:
						setAlertMsg("Errore del server. Riprova più tardi.");
						break;
					default:
						setAlertMsg("Si è verificato un errore. Si prega di riprovare.");
						break;
				}
				setShowAlert(true);
			}
		} catch (error) {
			setAlertMsg("Errore di rete o problema di connessione.");
			setShowAlert(true);
		}
	};

	return (
		<div>
			<Navbar expand="lg" className="mb-2">
				<Container>
					<NavLink to="/" className="nav-link bg-warning rounded px-3 py-1 fs-5 fw-bold">
						WeatherApp{selectedCity && ` - ${selectedCity}`}
					</NavLink>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto"></Nav>
						<Form className="d-flex" onSubmit={handleSearchSubmit}>
							<FormControl
								type="search"
								placeholder="Search City..."
								className="mr-2"
								aria-label="Search"
								value={searchTerm}
								onChange={handleSearchChange}
							/>
							<Button variant="dark" className="ms-2" type="submit">
								Search
							</Button>
						</Form>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			{showAlert && (
				<Container>
					<Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
						{alertMsg}
					</Alert>
				</Container>
			)}
		</div>
	);
};

export default NavBar;
