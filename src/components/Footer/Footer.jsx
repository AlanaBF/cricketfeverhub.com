import "../../assets/styles/components.css";

function Footer() {
  return (
    <footer className="footer">
      <nav className="footer-socials" aria-label="Social media links">
        <a
          href="https://www.instagram.com/teacherturnsturtle81/"
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Visit Instagram profile"
        >
          <i className="fa navbarIcons fa-instagram"></i>
        </a>
        <a
          href="https://www.facebook.com/teacherturnsturtle"
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Visit Facebook page"
        >
          <i className="fa navbarIcons fa-facebook"></i>
        </a>
        <a
          href="https://github.com/AlanaBF"
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Visit GitHub profile"
        >
          <i className="fa navbarIcons fa-github"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/alanabarrettfrew/"
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Visit LinkedIn profile"
        >
          <i className="fa navbarIcons fa-linkedin"></i>
        </a>
      </nav>
      <p className="footer-copyright">
        &copy; {new Date().getFullYear()} Alana Barrett-Frew
      </p>
    </footer>
  );
}

export default Footer;
