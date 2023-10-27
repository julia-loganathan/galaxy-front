import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    const [destinations, setDestinations] = useState([]);
    const [error, setError] = useState(null);


    const handleParticipateClick = (destination) => {

        console.log(`Participer à un voyage pour ${destination.name}`);
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

    return (
        <div>
            <h1>Catalogue des destinations</h1>
            {error ? (
                <p>Erreur : {error}</p>
            ) : (
                <div className="destination-list">
                    {destinations.map((destination) => (
                        <div key={destination._id} className="destination-item">
                            <Link to={`/destination/${destination._id}`}>
                                <h2 className="destination-name">{destination.name}</h2>
                                {destination.imageUrl && (
                                    <img
                                        src={destination.imageUrl}
                                        alt={destination.name}
                                        className="destination-image"
                                    />
                                )}
                                <p className="destination-description">{destination.description}</p>
                                <p className="destination-durée">{`Durée : ${destination.durée}`}</p>

                                <button onClick={() => handleParticipateClick(destination)}>
                                    Participer à un voyage
                                </button>
                            </Link>
                        </div>

                    ))}
                </div>
            )
            }
        </div >
    );
}

export default HomePage;
