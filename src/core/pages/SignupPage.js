import React, { useState } from 'react';

import { useSignup } from '../hooks/useSignup';
import { useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

const SignupPage = () => {
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(nom, email, password)
        
        if (!error) {
            navigate('/'); 
        }
    };

    return (
        <Container className="mt-5">
            <h3 className="mb-4">Créer un compte</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="signupNom">
                    <Form.Label>Nom:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Entrez votre nom"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="signupEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Entrez votre email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="signupPassword">
                    <Form.Label>Mot de passe:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Entrez votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isLoading}>
                    Créer
                </Button>
                {error && <p className="mt-2 text-danger">{error}</p>}
            </Form>
        </Container>
    );
};

export default SignupPage;