import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setStudentData } from '../features/dashboardSlice';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = ({ showLoginModal, handleCloseModal, setIsLoggedIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user.users); // Fetch users data from Redux store

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [status, setStatus] = useState('');
  const [popup, setPopup] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetStatus, setResetStatus] = useState('');
  const [resetPopup, setResetPopup] = useState('');

  const regEmailAdmin = /^admin@gmail.com$/;
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Common password validation pattern

  const validateCredentials = () => {
    const user = users.find(user => user.email === email);
    return user && user.password === password;
  };

  const validateEmail = (email) => {
    return regEmailAdmin.test(email) || users.some(user => user.email === email);
  };

  const validatePassword = (password) => {
    if (email.match(regEmailAdmin)) {
      return password === '12345678';
    } 
    return passwordPattern.test(password);
  };

  const handleSubmit = () => {
    const isEmailEmpty = !email;
    const isPasswordEmpty = !password;

    // Validate email and password
    const emailIsValid = !isEmailEmpty && validateEmail(email);
    const passwordIsValid = !isPasswordEmpty && validatePassword(password);

    setEmailValid(emailIsValid);
    setPasswordValid(passwordIsValid);

    if (isEmailEmpty || isPasswordEmpty) {
      return; // Prevent form submission
    }

    if (email.match(regEmailAdmin) && password === '12345678') {
      setPopup('Login Successfully!');
      setStatus('');
      setTimeout(() => {
        setIsLoggedIn(true); // Set login state to true
        handleCloseModal(); // Close the modal
        navigate('/staff-dashboard');
      }, 1000);
    } else if (validateCredentials()) {
      setPopup('Login Successfully!');
      const user = users.find(user => user.email === email);
      dispatch(setStudentData(user));
      setIsLoggedIn(true); // Set login state to true
      handleCloseModal(); // Close the modal
      navigate('/student-dashboard');
      setStatus('');
    } else {
      setStatus('Invalid email or password');
    }
  };

  const handleResetSubmit = () => {
    const user = users.find(user => user.email === resetEmail);
    if (newPassword !== confirmPassword) {
      setResetStatus('Passwords do not match');
      return;
    }

    if (!passwordPattern.test(newPassword)) {
      setResetStatus('New password does not meet the requirements');
      return;
    }

    // Here, you would typically update the user's password in your backend.
    // For simplicity, we're just logging and closing the modal.
    console.log(`Password reset for ${resetEmail}: ${newPassword}`);
    setResetPopup('Password reset successfully!');
    setResetStatus('');
    setShowResetModal(false);
    setResetEmail('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <>
      <Modal 
        show={showLoginModal} 
        onHide={handleCloseModal} 
        centered
        className="login-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {popup && <Alert variant="success">{popup}</Alert>}
          {status && <Alert variant="danger">{status}</Alert>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  const newEmail = e.target.value;
                  setEmail(newEmail);
                  setEmailValid(newEmail ? validateEmail(newEmail) : null);
                }}
                isInvalid={emailValid === false}
                isValid={emailValid === true}
              />
              <Form.Control.Feedback type="invalid">
                {email === '' ? 'Email is required' : 'Invalid email'}
              </Form.Control.Feedback>
              <Form.Control.Feedback type="valid" style={{ color: 'green' }}>
                Valid email
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  const newPassword = e.target.value;
                  setPassword(newPassword);
                  setPasswordValid(newPassword ? validatePassword(newPassword) : null);
                }}
                isInvalid={passwordValid === false}
                isValid={passwordValid === true}
              />
              <Form.Control.Feedback type="invalid">
                {password === '' ? 'Password is required' : 'Invalid password'}
              </Form.Control.Feedback>
              <Form.Control.Feedback type="valid" style={{ color: 'green' }}>
                Valid password
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" className="w-100 mt-3" onClick={handleSubmit}>
              Login
            </Button>
            <Button variant="link" className="w-100 mt-2" onClick={() => {
              setResetEmail(email); // Pre-fill email in reset modal
              setShowResetModal(true);
            }}>
              Forgot Password?
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Password Reset Modal */}
      <Modal 
        show={showResetModal} 
        onHide={() => setShowResetModal(false)} 
        centered
        className="reset-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {resetPopup && <Alert variant="success">{resetPopup}</Alert>}
          {resetStatus && <Alert variant="danger">{resetStatus}</Alert>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                readOnly // Make the email field read-only
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                isInvalid={newPassword && !passwordPattern.test(newPassword)}
              />
              <Form.Control.Feedback type="invalid">
                {newPassword && !passwordPattern.test(newPassword) ? 'Password must be at least 8 characters long, including 1 letter and 1 number' : ''}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                isInvalid={confirmPassword && newPassword !== confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {confirmPassword && newPassword !== confirmPassword ? 'Passwords do not match' : ''}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="primary" onClick={handleResetSubmit}>
                Reset Password
              </Button>
              <Button variant="secondary" onClick={() => setShowResetModal(false)}>
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;
