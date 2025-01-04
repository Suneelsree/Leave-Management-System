// src/components/Footer.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './Footer.css';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-4" id="footer">
      <Container>
        <Row className="pt-3">
          <Col md={3}>
            <h5>Follow us</h5>
            <p>
              <a href="#"><i className="fa-brands fa-instagram text-white me-2"></i></a>
              <a href="#"><i className="fa-brands fa-facebook text-white me-2"></i></a>
              <a href="#"><i className="fa-brands fa-twitter text-white me-2"></i></a>
              <a href="#"><i className="fa-brands fa-youtube text-white me-2"></i></a>
            </p>
            <p>+91 9363393336</p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d5005.159617304137!2d76.94971505299078!3d10.936083395304337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1721745712917!5m2!1sen!2sin"
              width="200" height="150" style={{ border: 0 }} allowFullScreen="" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Col>
          <Col md={3}>
            <h5>Homes</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Contact us</a></li>
              <li><a href="#" className="text-white">Help desk</a></li>
              <li><a href="#" className="text-white">Privacy policy</a></li>
              <li><a href="#" className="text-white">Terms of services</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Resources</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Explore LMS</a></li>
              <li><a href="#" className="text-white">Online Automated Leave Approval</a></li>
              <li><a href="#" className="text-white">Security</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Terms & Conditions</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Staff Privacy policy</a></li>
              <li><a href="#" className="text-white">Student privacy policy</a></li>
              <li><a href="#" className="text-white">Inclusion and accessibility policy</a></li>
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="text-center py-2 bg-secondary">
        <p>&copy; Leave Management Solutions <sup>TM</sup> Designed by DarkingSuneel</p>
      </div>
    </footer>
  );
};

export default Footer;
