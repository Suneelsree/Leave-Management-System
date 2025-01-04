import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Container, Button, Modal, Row, Col } from 'react-bootstrap';
import UserForm from './UserForm';
import { deleteUser } from '../features/userSlice'; // Ensure you have a deleteUser action

const UserTable = () => {
  const [showUserForm, setShowUserForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // For edit mode
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null); // User to be deleted
  const users = useSelector(state => state.user.users);
  const dispatch = useDispatch();

  const handleShowUserForm = (user = null) => {
    setCurrentUser(user);
    setShowUserForm(true);
  };

  const handleCloseUserForm = () => {
    setCurrentUser(null);
    setShowUserForm(false);
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      dispatch(deleteUser(userToDelete.id)); // Adjust based on your action
      setShowDeleteConfirm(false);
      setUserToDelete(null);
    }
  };

  return (
    <Container>
      <h2 className="my-3 text-center">User List</h2>
      <Row>
        <Col></Col>
        <Col className="text-end">
          <Button 
            variant="primary" 
            onClick={() => handleShowUserForm()} 
            className="mb-3"
          >
            Add User
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Year</th>
            <th>Department</th>
            <th>Student ID</th>
            <th>College Name</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">No users available</td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={index}>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.year}</td>
                <td>{user.department}</td>
                <td>{user.studentId}</td>
                <td>{user.collegename}</td>
                <td>{user.phoneno}</td>
                <td>
                  <Button 
                    variant="warning" 
                    onClick={() => handleShowUserForm(user)} 
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="danger" 
                    onClick={() => handleDelete(user)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <UserForm
        showModal={showUserForm}
        handleClose={handleCloseUserForm}
        initialData={currentUser} 
      />
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserTable;
