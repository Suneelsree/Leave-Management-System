import React from 'react';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = ({ setSelectedComponent, handleLogout }) => {
    const linkStyle = {
        fontSize: '20px',
        color: 'white',
        textDecoration: 'none'
    };

    return (
        <div className="sidebar bg-dark text-white p-4" style={{ height: '100vh', width: '300px', marginLeft: '0', marginTop: '0' }}>
            <Nav className="flex-column">
                <Nav.Link style={linkStyle} onClick={() => setSelectedComponent('staff-dashboard')}>Dashboard</Nav.Link>
                <Nav.Link style={linkStyle} onClick={() => setSelectedComponent('report')}>Report</Nav.Link>
                <Nav.Link style={linkStyle} onClick={() => setSelectedComponent('request-table')}>Received Request</Nav.Link>
                <Nav.Link style={linkStyle} onClick={() => setSelectedComponent('user-list')}>User List</Nav.Link>
                <Nav.Link style={linkStyle} onClick={() => setSelectedComponent('profilest')}>Profile</Nav.Link>
                <Nav.Link style={linkStyle} onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
        </div>
    );
};

export default Sidebar;
