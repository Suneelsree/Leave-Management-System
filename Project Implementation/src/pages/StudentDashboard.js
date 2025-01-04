import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar1 from '../components/Sidebar1';
import UserLeaveStatus from '../components/UserLeaveStatus';
import Profile from '../components/Profile';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const StudentDashboard = ({ handleShowLeaveForm, handleLogout }) => {
    const navigate = useNavigate();
    const student = useSelector(state => state.dashboard.student);
    const requests = useSelector(state => state.leave.report);

    const approvedCount = requests.filter(request => request.status === 'Approved').length;
    const rejectedCount = requests.filter(request => request.status === 'Rejected').length;

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
                        size: 18,
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

    const [selectedComponent, setSelectedComponent] = useState('student-dashboard');

    return (
        <div style={{ display: 'flex', height: '100vh', flexDirection: 'row', margin: '-20px -20px 0 ' }}>
            <Sidebar1 
                setSelectedComponent={setSelectedComponent} 
                handleShowLeaveForm={handleShowLeaveForm} 
                handleLogout={() => {
                    handleLogout();
                    navigate('/'); 
                }} 
            />
            <div style={{ padding: '20px', width: '100%' }}>
                {selectedComponent === 'student-dashboard' && (
                    <Container fluid>
                        <Row>
                            <Col>
                                <div className="header mt-1 mb-3">
                                    <h2>Welcome, {student?.fullname || 'Student'}!</h2>
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
                )}
                {selectedComponent === 'leave-status' && <UserLeaveStatus />}
                {selectedComponent === 'profile' && <Profile />}
            </div>
        </div>
    );
};

export default StudentDashboard;
