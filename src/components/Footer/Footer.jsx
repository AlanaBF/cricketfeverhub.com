import "../../assets/styles/components.css";
import { Link } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
function Footer() {
  return (
    <footer className="footer">
      Made with ❤️️ by Alana &copy; 2023 Alana Barrett-Frew   <Nav className="nav navbar-nav flex-row justify-content-md-center justify-content-start flex-nowrap">
            <div className="navIcons">
              <a
                href="https://www.instagram.com/teacherturnsturtle81/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fa navbarIcons fa-instagram"></i>
              </a>
              <a
                href="https://www.facebook.com/teacherturnsturtle"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fa navbarIcons fa-facebook"></i>
              </a>
              <a
                href="https://github.com/AlanaBF"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fa navbarIcons fa-github"></i>
              </a>{" "}
              <a
                href="https://www.linkedin.com/in/alanabarrettfrew/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fa navbarIcons fa-linkedin"></i>
              </a>
            </div>
          </Nav><nav><p>
     <Link to="/readme">Read Documentation</Link></p></nav>
    </footer>
  );
}

export default Footer;
