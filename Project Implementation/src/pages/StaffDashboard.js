import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReportPage from '../components/ReportPage';
import RequestTable from '../components/RequestTable';
import { useNavigate } from 'react-router-dom';
import UserTable from '../components/UserTable';
import Profile from '../components/Profile';
import UserForm from '../components/UserForm';
import Sidebar from '../components/Sidebar';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/StaffDashboard.css';
import { useSelector } from 'react-redux';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const StaffDashboard = ({ handleLogout }) => {
    const requests = useSelector(state => state.leave.report);
    const isRequestsValid = Array.isArray(requests);

    const approvedCount = requests.filter(request => request.status === 'Approved').length;
    const rejectedCount = requests.filter(request => request.status === 'Rejected').length;
    const navigate = useNavigate();
    const data = {
        labels: ['Approved', 'Rejected'],
        datasets: [{
            data: [approvedCount, rejectedCount],
            backgroundColor: ['#f3ff0a', '#0fc502'],
            borderColor: 'black',
            borderWidth: 1,
        }],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 15,
                    padding: 20,
                    font: {
                        size: 16,
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.raw;
                        const total = approvedCount + rejectedCount;
                        return `${label}: ${value} (${((value / total) * 100).toFixed(2)}%)`;
                    },
                },
            },
        },
        layout: {
            padding: {
                bottom: 20,
            },
        },
    };

    const [showUserForm, setShowUserForm] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState('staff-dashboard');

    const handleShowUserForm = () => setShowUserForm(true);
    const handleCloseUserForm = () => setShowUserForm(false);

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'staff-dashboard':
                return (
                    <Container fluid>
                        <Row>
                            <Col>
                                <div className="header mt-1 mb-3">
                                    <h2>Welcome, Staff!</h2>
                                </div>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col xs={12} md={8} lg={6}>
                                <div className="card" style={{ height: 'fit-content', padding: '10px' }}>
                                    <div className="card-body">
                                        <h2 className="text-center mb-3">Leave Requests</h2>
                                        <div className="d-flex justify-content-center">
                                            <div style={{ width: '80%', maxWidth: '400px', height: '80%' }}>
                                                <Pie data={data} options={options} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                );
            case 'report':
                return <ReportPage />;
            case 'request-table':
                return <RequestTable />;
            case 'user-list':
                return <UserTable />;
            case 'profile':
                return <Profile />;
            default:
                return null;
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh', flexDirection: 'row', margin: '-20px -20px 0 ' }}>
            <Sidebar 
                setSelectedComponent={setSelectedComponent}  
                handleLogout={() => {
                    navigate('/'); 
                }} 
            />
            <div style={{ padding: '20px', width: '100%' }}>
                {renderComponent()}
            </div>
            <UserForm showModal={showUserForm} handleClose={handleCloseUserForm} />
        </div>
    );
};

export default StaffDashboard;
