import { LinkContainer } from "react-router-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import favicon from "/CricketImage.jpeg";
import getPlayersData from "../../utils/getPlayers_API";
import "../../assets/styles/components.css";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  const isActive = (path) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    clearTimeout(debounceRef.current);
    if (query.trim().length < 2) {
      setSearchResults([]);
      setSearchOpen(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const data = await getPlayersData(query.trim());
        const players = data?.player || data?.players || [];
        setSearchResults(players.slice(0, 6));
        setSearchOpen(players.length > 0);
      } catch {
        setSearchResults([]);
        setSearchOpen(false);
      }
    }, 400);
  };

  const handleResultClick = (playerId) => {
    setSearchQuery("");
    setSearchResults([]);
    setSearchOpen(false);
    navigate(`/player/${playerId}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setSearchOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          <Nav className="navbar-nav mx-auto text-md-center text-left">
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
          <div className="search-wrapper" ref={searchRef}>
            <input
              className="search-input"
              type="search"
              placeholder="Search players..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              aria-label="Search for a player"
              aria-expanded={searchOpen}
              aria-haspopup="listbox"
              autoComplete="off"
            />
            {searchOpen && searchResults.length > 0 && (
              <ul className="search-dropdown" role="listbox">
                {searchResults.map((player) => (
                  <li key={player.id} role="option">
                    <button
                      className="search-dropdown-item"
                      onMouseDown={() => handleResultClick(player.id)}
                    >
                      <span className="search-player-name">{player.name}</span>
                      {(player.teamName || player.team) && (
                        <span className="search-player-team">{player.teamName || player.team}</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
