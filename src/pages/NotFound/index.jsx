import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import error from '../../assets/images/vecteezy_3d-code-debugging-illustration-side-view_10998101_639.png';
import '../../assets/styles/pages.css';


const NotFound = () => {
  return (
    <Container fluid className='notFoundPageContainer'>
      <Container className='notFoundPageInner'>
        <div className='notFoundPageContent'>
          <div className='notFoundPageText'>
            <p>Oops...</p>
            <span>404</span>
            <p>Page Not Found</p>
            <Link to='/'>Go To Home Page</Link>
          </div>
          <div className='notFoundPageImage'>
            {/* <img className='bug404' src={error} alt='Bug Illustration' /> */}
          </div>
          <div className='notFoundPageAttribution'>
            {/* <a href='https://www.vecteezy.com/free-png/error'>Error PNGs by Vecteezy</a> */}
          </div>
        </div>
      </Container>
    </Container>
  );
};

export default NotFound;
