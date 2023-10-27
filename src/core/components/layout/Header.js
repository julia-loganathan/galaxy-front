import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';

import { Link } from "react-router-dom";
import { Button, ButtonGroup } from 'react-bootstrap'; 
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

const Header = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

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
          <div className="d-flex align-items-center">
            {user ? (
              <>
                <span className="me-3">
                  <Badge bg="secondary" pill className="px-3 py-2">{user.nom}</Badge>
                </span>
                <Button variant="danger" onClick={handleLogout}>Se déconnecter</Button>
              </>
            ) : (
              <ButtonGroup> 
                <Link to={'/login'} className="btn btn-primary me-2">Se connecter</Link>
                <Link to={'/signup'} className="btn btn-success">Créer un compte</Link> 
              </ButtonGroup>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;