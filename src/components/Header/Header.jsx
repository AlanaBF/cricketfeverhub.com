import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import favicon from "../../assets/favicon_io/apple-touch-icon.png";
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

            <NavDropdown title="Matches" id="matches-dropdown">
              <LinkContainer to="/LiveMatches">
                <NavDropdown.Item className="navLink">Live Matches</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/UpcomingMatchesPage">
                <NavDropdown.Item className="navLink">Upcoming Matches</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>

          <Nav className="nav navbar-nav flex-row justify-content-md-center justify-content-start flex-nowrap">
            <div className="navIcons">
              <a href="https://twitter.com/AlanaBF81" rel="noopener noreferrer">
                <i className="fa navbarIcons fa-twitter"></i>
              </a>
              <a href="https://github.com/AlanaBF" rel="noopener noreferrer">
                <i className="fa navbarIcons fa-github"></i>
              </a>{" "}
              <a href="https://www.linkedin.com/in/alanabarrettfrew/" rel="noopener noreferrer">
                <i className="fa navbarIcons fa-linkedin"></i>
              </a>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

