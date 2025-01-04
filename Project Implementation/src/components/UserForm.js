import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, updateUser } from '../features/userSlice'; // Ensure you have an updateUser action
import { Modal, Form, Button, Alert } from 'react-bootstrap';

const UserForm = ({ showModal, handleClose, initialData = null }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    year: '',
    department: '',
    studentId: '',
    collegename: '',
    phoneno: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        fullname: initialData.fullname || '',
        email: initialData.email || '',
        year: initialData.year || '',
        department: initialData.department || '',
        studentId: initialData.studentId || '',
        collegename: initialData.collegename || '',
        phoneno: initialData.phoneno || '',
        password: '',
      });
      setIsEditing(true);
    } else {
      setIsEditing(false);
      setFormData({
        fullname: '',
        email: '',
        year: '',
        department: '',
        studentId: '',
        collegename: '',
        phoneno: '',
        password: '',
      });
    }
  }, [initialData]);

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'fullname':
        if (!value) {
          error = 'Full Name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = 'Name should contain only alphabets';
        }
        break;
      case 'email':
        if (!value) {
          error = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Invalid email format';
        }
        break;
      case 'year':
        if (!value) {
          error = 'Year is required';
        } else if (!/^(I|II|III|IV)$/.test(value)) {
          error = 'Year should be I, II, III, or IV';
        }
        break;
      case 'department':
        if (!value) {
          error = 'Department is required';
        } else if (!/^(CSE|ECE|EEE|Mech|Civil)$/.test(value)) {
          error = 'Department should be CSE, ECE, EEE, Mech, or Civil';
        }
        break;
      case 'studentId':
        if (!value) {
          error = 'Student ID is required';
        } else if (!/^\d{2}[a-zA-Z]{2}\d{2}$/.test(value)) {
          error = 'Student ID should be in the format 21cs44';
        }
        break;
      case 'collegename':
        if (!value) {
          error = 'College Name is required';
        } else if (!/^[a-zA-Z\s.]+$/.test(value)) {
          error = 'College name should contain only alphabets and periods';
        }
        break;
      case 'phoneno':
        if (!value) {
          error = 'Phone Number is required';
        } else if (!/^\d{10}$/.test(value)) {
          error = 'Phone number should be 10 digits';
        }
        break;
      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 8) {
          error = 'Password should be at least 8 characters long';
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
    validateField(id, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allErrors = {};
    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field]);
      if (errors[field]) {
        allErrors[field] = errors[field];
      }
    });
    if (Object.keys(allErrors).length === 0) {
      if (isEditing) {
        dispatch(updateUser(formData)); // Pass the updated user data
      } else {
        dispatch(addUser(formData));
      }
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      setFormData({
        fullname: '',
        email: '',
        year: '',
        department: '',
        studentId: '',
        collegename: '',
        phoneno: '',
        password: '',
      });
      setErrors({});
      handleClose(); // Close the modal after submission
    } else {
      setErrors(allErrors); // Set the errors if any
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Edit User' : 'Add User'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showAlert && <Alert variant="success">{isEditing ? 'User updated successfully!' : 'User added successfully!'}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="fullname">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              value={formData.fullname}
              onChange={handleChange}
              isInvalid={!!errors.fullname}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fullname}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="year">
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter year (I, II, III, IV)"
              value={formData.year}
              onChange={handleChange}
              isInvalid={!!errors.year}
            />
            <Form.Control.Feedback type="invalid">
              {errors.year}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="department">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter department (CSE, ECE, EEE, Mech, Civil)"
              value={formData.department}
              onChange={handleChange}
              isInvalid={!!errors.department}
            />
            <Form.Control.Feedback type="invalid">
              {errors.department}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="studentId">
            <Form.Label>Student ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter student ID"
              value={formData.studentId}
              onChange={handleChange}
              isInvalid={!!errors.studentId}
            />
            <Form.Control.Feedback type="invalid">
              {errors.studentId}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="collegename">
            <Form.Label>College Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter college name"
              value={formData.collegename}
              onChange={handleChange}
              isInvalid={!!errors.collegename}
            />
            <Form.Control.Feedback type="invalid">
              {errors.collegename}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="phoneno">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              value={formData.phoneno}
              onChange={handleChange}
              isInvalid={!!errors.phoneno}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phoneno}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" className="my-3">
            {isEditing ? 'Save Changes' : 'Add User'}
          </Button>
          {isEditing && (
            <Button variant="secondary" onClick={() => handleClose()} className="my-3 ms-2">
              Reset
            </Button>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UserForm;
