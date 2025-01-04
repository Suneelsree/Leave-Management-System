import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequests, approveRequest, rejectRequest } from '../features/leaveSlice';
import * as XLSX from 'xlsx'; // Import the xlsx library

const ReportPage = () => {
    const dispatch = useDispatch();
    const requests = useSelector(state => state.leave.report);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [filterStatus, setFilterStatus] = useState('');
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newStatus, setNewStatus] = useState(''); // State to handle new status in modal

    useEffect(() => {
        dispatch(fetchRequests()); // Fetch requests from the backend
    }, [dispatch]);

    useEffect(() => {
        // Ensure requests are unique based on studentId
        const seen = new Set();
        const uniqueRequests = requests.filter(request => {
            const isDuplicate = seen.has(request.studentId);
            seen.add(request.studentId);
            return !isDuplicate;
        });
        setFilteredRequests(uniqueRequests);
    }, [requests]);

    useEffect(() => {
        // Filter requests based on the selected status
        if (filterStatus === '') {
            setFilteredRequests(requests);
        } else {
            setFilteredRequests(requests.filter(request => request.status === filterStatus));
        }
    }, [requests, filterStatus]);

    const handleFilterChange = (e) => {
        setFilterStatus(e.target.value);
    };

    const handleEdit = (request) => {
        setSelectedRequest(request);
        setNewStatus(request.status); // Set the current status in modal
        setShowModal(true);
    };

    const handleStatusChange = async () => {
        if (selectedRequest) {
            const updatedRequest = { ...selectedRequest, status: newStatus };
            try {
                // Dispatch the appropriate action based on the new status
                if (newStatus === 'Approved') {
                    await dispatch(approveRequest(updatedRequest));
                } else if (newStatus === 'Rejected') {
                    await dispatch(rejectRequest(updatedRequest));
                }

                // Update the request in the filtered list
                setFilteredRequests(prevRequests =>
                    prevRequests.map(request =>
                        request.studentId === selectedRequest.studentId
                            ? updatedRequest
                            : request
                    )
                );

                // Close the modal and reset the selected request
                setShowModal(false);
                setSelectedRequest(null);
            } catch (error) {
                console.error('Failed to update request status:', error);
            }
        }
    };

    const handleCancel = () => {
        setShowModal(false);
        setSelectedRequest(null);
    };

    const handleStatusChangeInput = (e) => {
        setNewStatus(e.target.value);
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredRequests.map((request, index) => ({
            'S.No': index + 1,
            'Name': request.name || 'N/A',
            'Student Id': request.studentId || 'N/A',
            'From': request.fromDate || 'N/A',
            'To': request.toDate || 'N/A',
            'Reason': request.reasonType || 'N/A',
            'Received Date': request.receivedDate || 'N/A',
            'Status': request.status || 'N/A'
        })));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Requests');

        XLSX.writeFile(wb, 'RequestsReport.xlsx');
    };

    return (
        <Container fluid>
            <h2 style={{ textAlign: 'center' }}>Report Table</h2>
            <Row className="mb-2">
                <Col md={3} className="text-end">
                    <Form.Select className="mb-2" value={filterStatus} onChange={handleFilterChange}>
                        <option value="">Request Type</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </Form.Select>
                </Col>
                <Col className="text-end">
                    <Button onClick={exportToExcel}>Export</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Student Id</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Reason</th>
                                <th>Received Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRequests.length > 0 ? (
                                filteredRequests.map((request, index) => (
                                    <tr key={request.studentId}>
                                        <td>{index + 1}</td>
                                        <td>{request.name || 'N/A'}</td>
                                        <td>{request.studentId || 'N/A'}</td>
                                        <td>{request.fromDate || 'N/A'}</td>
                                        <td>{request.toDate || 'N/A'}</td>
                                        <td>{request.reasonType || 'N/A'}</td>
                                        <td>{request.receivedDate || 'N/A'}</td>
                                        <td>{request.status || 'N/A'}</td>
                                        <td>
                                            <Button variant="warning" onClick={() => handleEdit(request)}>Edit</Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center">No requests found</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <Modal show={showModal} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Control 
                            as="select" 
                            value={newStatus} 
                            onChange={handleStatusChangeInput}
                        >
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleStatusChange}>Save Changes</Button>
                    <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ReportPage;
