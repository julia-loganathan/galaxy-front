import React from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { useLogout } from '../../hooks/useLogout';

const Header = () => {
  const { logout } = useLogout()

  const handleLogout = () => {
    logout()
  }

  return (
    <Navbar expand="lg" bg="light" variant="light" className="mb-4">
      <Container>
        <Link className="navbar-brand" to="/">
          Galaxy
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to="/">Accueil</Link>
          </Nav>
          <div className="d-flex">
            <Button variant="danger" className="me-2" onClick={handleLogout}>Se déconnecter</Button>
            <Link to={'/login'} className="btn btn-primary">Se connecter</Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;