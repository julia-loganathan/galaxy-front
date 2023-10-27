import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ReservationPopup({ show, onHide, destination,user, onReservation, onClose }) {
    const [nombrePlaces, setNombrePlaces] = useState(1);
    const [dateDebutVoyage, setDateDebutVoyage] = useState('');
    const [showValidationMessage, setShowValidationMessage] = useState(false);


    const handleReservation = async () => {
      try {
        const reservationData = {
          user: user,
          voyage: destination._id,
          nombrePlaces: nombrePlaces,
          dateDebutVoyage: dateDebutVoyage,
        };
        console.log(reservationData)
        const response = await fetch('http://localhost:4000/reservations/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reservationData),
        });

        if (response.status === 201) {          
          setShowValidationMessage(true);
          onReservation(user,destination, nombrePlaces, dateDebutVoyage);
        } else {
          console.error('Échec de la réservation: ' + response.status);
        }
      } catch (error) {
        console.error('Erreur lors de la réservation:', error);
      }
    };
    

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Réservation de Voyage pour {destination.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Nombre de Places</Form.Label>
                        <Form.Control
                            type="number"
                            value={nombrePlaces}
                            onChange={(e) => setNombrePlaces(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date du Voyage</Form.Label>
                        <Form.Control
                            type="date"
                            value={dateDebutVoyage}
                            onChange={(e) => setDateDebutVoyage(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {showValidationMessage ? (
                    <div className="validation-message">Votre réservation a été validée !</div>
                ) : (<>
                  <Button variant="secondary" onClick={onHide}>
                      Annuler
                  </Button>
                  <Button variant="primary" onClick={handleReservation}>
                      Valider
                  </Button></>
                )}
            </Modal.Footer>
        </Modal>
    );
}

export default ReservationPopup;
