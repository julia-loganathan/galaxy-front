import React, { useState } from 'react';

import { useLogin } from '../hooks/uselogin';
import { useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password)

        if (!error) {
            navigate('/'); 
        }
    };

    return (
        <Container className="mt-5">
            <h3 className="mb-4">Se connecter</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="loginEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="loginPassword">
                    <Form.Label>Mot de passe:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isLoading}>
                    Se connecter
                </Button>
                {error && <p className="mt-2 text-danger">{error}</p>}
            </Form>
        </Container>
    );
};

export default LoginPage;