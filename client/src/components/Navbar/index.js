import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

export default function Navbar2() {
  return (
    <Navbar fixed="top" collapseOnSelect expand="md" bg="dark" variant="dark">
      <Navbar.Brand href="/">Google Books</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/search">
            <Nav.Link>Search for Books</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/saved">
            <Nav.Link>Your Saved Books</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
