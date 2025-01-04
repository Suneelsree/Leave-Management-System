import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const UserLeaveStatus = () => {
    const student = useSelector(state => state.dashboard.student);
    const leaveReports = useSelector(state => state.leave.report);
    const [userRequests, setUserRequests] = useState([]);

    useEffect(() => {
        if (student) {
            const filteredRequests = leaveReports.filter(request => request.studentId === student.studentId);
            setUserRequests(filteredRequests);
        }
    }, [student, leaveReports]);

    return (
        <Container fluid>
            <Row>
                <Col>
                    <div className="header mt-4 mb-4">
                        <h2>Your Leave Status</h2>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Reason</th>
                                <th>Approved Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userRequests.length > 0 ? (
                                userRequests.map((request, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{request.fromDate}</td>
                                        <td>{request.toDate}</td>
                                        <td>{request.reasonType}</td>
                                        <td>{request.receivedDate}</td>
                                        <td>{request.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">No leave requests found</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default UserLeaveStatus;
