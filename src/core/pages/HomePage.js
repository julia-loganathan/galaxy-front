import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import ReservationPopup from '../components/reservation/ReservationPopup';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

function HomePage() {
    const [destinations, setDestinations] = useState([]);
    const [error, setError] = useState(null);

    const [showModals, setShowModals] = useState({});
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [nombrePlaces, setNombrePlaces] = useState(1);
    const [dateDebutVoyage, setDateDebutVoyage] = useState('');

    const { user } = useAuthContext();

    const openModal = (destination) => {
        setSelectedDestination(destination);
        setShowModals({ ...showModals, [destination._id]: true });
    };

    const closeModal = (destination) => {
        setSelectedDestination(null);
        setShowModals({ ...showModals, [destination._id]: false });
    };

    useEffect(() => {
        fetch('http://localhost:4000/api/destinations/destination', { method: 'GET', mode: 'cors' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données.');
                }
                return response.json();
            })
            .then((data) => {
                setDestinations(data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    const handleReservation = async () => {
        try {
            
        } catch (error) {
            console.error('Erreur lors de la réservation:', error);
        }
    };

    return (
        <div>
            <h1 className="text-center">Catalogue des destinations</h1>
            {error ? (
                <p>Erreur : {error}</p>
            ) : (
                <Row xs={1} md={2} className="justify-content-center">
                    {destinations.map((destination) => (
                        <Col key={destination._id}>
                            <Card className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
                                    <Card.Body className="text-center">
                                        <Link to={`/destination/${destination._id}`}>       
                                            <Card.Title>{destination.name}</Card.Title>
                                        </Link>
                                        <Card.Text>{destination.description}</Card.Text>
                                    </Card.Body>
                                    <div className="d-flex justify-content-center align-items-center" style={{ maxWidth: '500px', maxHeight: '500px' }}>
                                        <Card.Img variant="top" style={{ maxWidth: '500px', maxHeight: '500px' }} src={destination.imageUrl} />
                                    </div>                                
                                {user ? (
                                    <>
                                        <Button variant="outline-primary" onClick={() => openModal(destination)}>
                                            Participer à un voyage
                                        </Button>
                                        <ReservationPopup
                                            show={showModals[destination._id] || false}
                                            onHide={() => closeModal(destination)}
                                            destination={destination}
                                            nombrePlaces={nombrePlaces}
                                            user={user.user._id}
                                            dateDebutVoyage={dateDebutVoyage}
                                            onClose={() => setShowModals({ ...showModals, [destination._id]: false })}
                                            onReservation={handleReservation}
                                        />
                                    </>
                                ) : (
                                    <div className="text-center">
                                        <p>Pour participer, veuillez vous <Link to="/login">connecter</Link>. Sinon, veuillez vous <Link to="/signup">inscrire</Link>.</p>
                                    </div>
                                )}
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}

export default HomePage;
