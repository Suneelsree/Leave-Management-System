import React from 'react';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar1 = ({ setSelectedComponent, handleShowLeaveForm, handleLogout }) => {
    const sidebarStyle = {
        height: '100vh',
        width: '300px',
        marginLeft: '0',
        marginTop: '0',
        backgroundColor: '#343a40', // Dark background color
        color: 'white',
        padding: '16px',
    };

    const linkStyle = {
        fontSize: '20px',
        color: 'white',
        textDecoration: 'none',
    };

    return (
        <div style={sidebarStyle}>
            <Nav className="flex-column">
                <Nav.Link style={linkStyle} onClick={() => setSelectedComponent('student-dashboard')}>
                    Home
                </Nav.Link>
                <Nav.Link style={linkStyle} onClick={handleShowLeaveForm}>
                    Apply Leave
                </Nav.Link>
                <Nav.Link style={linkStyle} onClick={() => setSelectedComponent('leave-status')}>
                    Leave Status
                </Nav.Link>
                <Nav.Link style={linkStyle} onClick={() => setSelectedComponent('profile')}>
                    Profile
                </Nav.Link>
                <Nav.Link style={linkStyle} onClick={handleLogout}>
                    Logout
                </Nav.Link>
            </Nav>
        </div>
    );
};

export default Sidebar1;
