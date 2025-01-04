import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import '../styles/index.css';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // Get the current path

    const handleShowLoginModal = () => setShowLoginModal(true);
    const handleCloseLoginModal = () => setShowLoginModal(false);

    const isHomePage = location.pathname === '/';

    return (
        <>
            <Navbar bg="info" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img src="/images/logo.png" alt="Logo" className="logo" style={{ width: "240px", height: "90px" }} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                            {isHomePage && !isLoggedIn && (
                                <>
                                    <Nav.Link as={Link} to="/" style={{ paddingLeft: '20px', paddingRight: '20px', fontSize: '22px', textDecoration: 'none' }}>
                                        Home
                                    </Nav.Link>
                                    <Nav.Link href="#features" style={{ paddingLeft: '20px', paddingRight: '20px', fontSize: '22px', textDecoration: 'none' }}>
                                        Features
                                    </Nav.Link>
                                    <Nav.Link href="#footer" style={{ paddingLeft: '20px', paddingRight: '20px', fontSize: '22px', textDecoration: 'none' }}>
                                        Contact us
                                    </Nav.Link>
                                </>
                            )}
                        </Nav>
                        {isHomePage && !isLoggedIn && (
                            <Button variant="danger" className="ms-auto" style={{ fontSize: '22px', color: 'white' }} onClick={handleShowLoginModal}>
                                Login
                            </Button>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Login 
                showLoginModal={showLoginModal} 
                handleCloseModal={handleCloseLoginModal} 
                setIsLoggedIn={setIsLoggedIn} 
            />
        </>
    );
};

export default Header;
