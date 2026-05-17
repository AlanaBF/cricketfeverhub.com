import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import favicon from "/CricketImage.jpeg";
import "../../assets/styles/components.css";

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="navbar navigation navbar-expand-lg justify-content-md-center justify-content-start"
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="navbarBrand">
            <img src={favicon} alt="Cricket Fever Hub home" width="50px" />
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" aria-label="Toggle navigation menu">
          <i className="fa-solid fa-bars"></i>
        </Navbar.Toggle>

        <Navbar.Collapse className="navbar-collapse collapse justify-content-between align-items-center w-100">
          <Nav className="me-auto navbar-nav mx-auto text-md-center text-left">
            <LinkContainer to="/">
              <Nav.Link className={`navLink ${isActive("/") && currentPath === "/" ? "active" : ""}`}>
                Home
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/LiveMatchesPage">
              <Nav.Link className={`navLink ${isActive("/LiveMatchesPage") ? "active" : ""}`}>
                Live Matches
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/UpcomingMatchesPage">
              <Nav.Link className={`navLink ${isActive("/UpcomingMatchesPage") ? "active" : ""}`}>
                Upcoming
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/rankings">
              <Nav.Link className={`navLink ${isActive("/rankings") ? "active" : ""}`}>
                Rankings
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/discover">
              <Nav.Link className={`navLink ${isActive("/discover") ? "active" : ""}`}>
                Discover
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
