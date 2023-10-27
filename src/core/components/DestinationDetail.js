import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import ReservationPopup from './reservation/ReservationPopup';

function DestinationDetail({ }) {
    const [destination, setDestination] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams()

    const [showModals, setShowModals] = useState({});
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [nombrePlaces, setNombrePlaces] = useState(1);
    const [dateDebutVoyage, setDateDebutVoyage] = useState('');

    const { user } = useAuthContext();


    useEffect(() => {
        fetch(`http://localhost:4000/api/destinations/${id}`, { method: 'GET', mode: 'cors' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données.');
                }
                return response.json();
            })
            .then((data) => {
                setDestination(data);
            })
            .catch((error) => {
                setError(error.message);
            });

    }, [id]);

    if (!destination) {
        return <div>Loading...</div>;
    }

    const openModal = (destination) => {
        setSelectedDestination(destination);
        setShowModals({ ...showModals, [destination._id]: true });
    };

    const closeModal = (destination) => {
        setSelectedDestination(null);
        setShowModals({ ...showModals, [destination._id]: false });
    };
    const handleReservation = async () => {
        try {
            
        } catch (error) {
            console.error('Erreur lors de la réservation:', error);
        }
    };
    return (
        <Card>
          <Row>
            <Col md={8}>
              <Card.Body className="text-center">
                <Card.Title>{destination.name}</Card.Title>
                <Card.Text >Description: {destination.description}</Card.Text>
                <Card.Text>Étape: {destination.etape}</Card.Text>
                <Card.Text>Durée: {destination.durée}</Card.Text>
                <Card.Text>Prix personne/jour: {destination.prix_per_jour}</Card.Text>
              
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
                            user={user.id}
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
                </Card.Body>
            </Col>
            <Col md={4}>
              <Card.Img src={destination.imageUrl} alt={destination.name} className="img-fluid" />
            </Col>
          </Row>
        </Card>
      );
}

export default DestinationDetail;
