import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Modal, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addLeaveRequest } from '../features/leaveSlice';
import { useNavigate } from 'react-router-dom';

const LeaveForm = ({ show, handleClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const student = useSelector(state => state.dashboard.student);

    const [formData, setFormData] = useState({
        name: '',
        studentId: '',
        fromDate: '',
        toDate: '',
        reasonType: '',
        reasonDescription: ''
    });

    const [error, setError] = useState('');

    useEffect(() => {
        if (student) {
            setFormData({
                ...formData,
                name: student.fullname || '',
                studentId: student.studentId || ''
            });
        }
    }, [student]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        const { name, studentId, fromDate, toDate, reasonType, reasonDescription } = formData;
        const date = new Date().toDateString();

        if (!name || !studentId || !fromDate || !toDate) {
            setError('Fields Should not be empty');
            return;
        }

        const newLeaveRequest = {
            name,
            studentId,
            fromDate,
            toDate,
            reasonType,
            reasonDescription,
            receivedDate: date
        };

        dispatch(addLeaveRequest(newLeaveRequest));

        setError('');
        handleClose();
        navigate('/student-dashboard');
    };

    const handleReset = () => {
        setFormData({
            name: '',
            studentId: '',
            fromDate: '',
            toDate: '',
            reasonType: '',
            reasonDescription: ''
        });
        setError('');
    };

    const handleCancel = () => {
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Leave Application Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form>
                    <Form.Group controlId="name">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="student-id">
                        <Form.Label>Student ID:</Form.Label>
                        <Form.Control
                            type="text"
                            name="studentId"
                            value={formData.studentId}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group controlId="from-date">
                                <Form.Label>From:</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="fromDate"
                                    value={formData.fromDate}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="to-date">
                                <Form.Label>To:</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="toDate"
                                    value={formData.toDate}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="reason-type">
                        <Form.Label>Reason Type:</Form.Label>
                        <Form.Control
                            as="select"
                            name="reasonType"
                            value={formData.reasonType}
                            onChange={handleChange}
                        >
                            <option value="" disabled>Select Reason Type</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Vacation">On Duty</option>
                            <option value="Personal">Personal</option>
                            <option value="Other">Other</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="reason-description">
                        <Form.Label>Reason Description:</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="reasonDescription"
                            value={formData.reasonDescription}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleReset}>Reset</Button>
                <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                <Button variant="danger" onClick={handleCancel}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LeaveForm;
