import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DestinationDetail({ }) {
    const [destination, setDestination] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams()

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

    return (
        <div className="centered-container">
            <h2>{destination.name}</h2>
            <img src={destination.imageUrl} alt={destination.name} className="destination-image" />
            <p>Description : {destination.description}</p>
            <p>Étape : {destination.etape}</p>
            <p>Durée : {destination.durée}</p>
            <p>Prix personne/jour : {destination.prix_per_jour}</p>

        </div>
    );
}

export default DestinationDetail;
