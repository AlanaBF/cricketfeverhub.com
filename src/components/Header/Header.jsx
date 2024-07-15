import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import favicon from "/CricketImage.jpeg";
import "../../assets/styles/components.css";

function Header() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="navbar navigation navbar-expand-lg justify-content-md-center justify-content-start"
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="navbarBrand">
            <img src={favicon} alt="logo" width="50px" />
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <i className="fa-solid fa-bars"></i>
        </Navbar.Toggle>

        <Navbar.Collapse className="navbar-collapse collapse justify-content-between align-items-center w-100">
          <Nav className="me-auto navbar-nav mx-auto text-md-center text-left">
            <LinkContainer to="/">
              <Nav.Link className="navLink">Home</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/LiveMatchesPage">
              <Nav.Link className="navLink">Live Matches</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/UpcomingMatchesPage">
              <Nav.Link className="navLink">Upcoming Matches</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/Fun">
              <Nav.Link className="navLink">Fun</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
