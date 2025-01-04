import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import ReportPage from './components/ReportPage';
import Profile from './components/Profile';
import Login from './components/Login';
import RequestTable from './components/RequestTable';
import StaffDashboard from './pages/StaffDashboard';
import Content from './components/Content';
import UserLeaveStatus from './components/UserLeaveStatus';
import StudentDashboard from './pages/StudentDashboard';
import UserTable from './components/UserTable';
import LeaveForm from './components/LeaveForm';

const App = () => {
    const navigate = useNavigate();
    const requests = useSelector((state) => state.leave.report);
    const profileData = {
        photo: './images/proimg.jpg',
        name: 'John Doe',
        id: '12345',
        email: 'john.doe@example.com',
        phone: '(123) 456-7890',
        institution: 'Example University',
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLeaveForm, setShowLeaveForm] = useState(false);

    const handleShowLeaveForm = () => setShowLeaveForm(true);
    const handleCloseLeaveForm = () => setShowLeaveForm(false);

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Routes>
                <Route path="/" element={<Content />} />
                <Route path="/staff-dashboard" element={<StaffDashboard />} />
                <Route path="/student-dashboard" element={<StudentDashboard handleShowLeaveForm={handleShowLeaveForm} handleLogout={handleLogout} />} />
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/profile" element={<Profile data={profileData} />} />
                <Route path="/request-table" element={<RequestTable />} />
                <Route path="/user-table" element={<UserTable />} />
                <Route path="/user-leave-status" element={<UserLeaveStatus />} />
                <Route path="/leave-form" element={<LeaveForm />} />
            </Routes>
            <Footer />
        </>
    );
};

export default App;
