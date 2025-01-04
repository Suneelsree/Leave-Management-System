import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './Content.css';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Content = () => {
  const cardStyle = {
    marginBottom: '1.5rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  };

  const cardBodyStyle = {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <Container className="mt-4" style={{backgroundColor:'whitesmoke'}}>
      <Row className="mb-4 align-items-center" style={{borderRadius:'10px',boxShadow:'0 0 2px 2px gray', backgroundColor:'white'}}>
        <Col md={6} className=' p-5 ml-1' style={{ textAlign:'center',backgroundColor:'white',borderRadius:'10px'}} >
          <h2>Why LMS?</h2>
          <p>
            The Leave Management System (LMS) dashboard is designed to simplify the leave management process for
            staff members. It provides essential features and functionalities to manage leave requests and stay
            informed about leave statuses. The LMS helps organizations efficiently handle leave administration,
            ensuring smooth operations and effective resource management.
          </p>
        </Col>
        <Col md={6} className='p-2'>
          <img src="/images/image1.png" alt="LMS" className="img-fluid" />
        </Col>
      </Row>
      <div id="features">
        <h1>Our Features</h1>
        <Row>
          <Col md={4}>
            <Card style={cardStyle}>
              <Card.Img variant="top" src="/images/f1.jpg" />
              <Card.Body style={cardBodyStyle}>
                <Card.Title>Automated Leave Requests and Approvals</Card.Title>
                <Card.Text>
                  Simplifies the process of requesting and approving leave by allowing employees to submit
                  requests online and automating the approval workflow. This feature streamlines
                  administrative tasks and ensures that requests are handled efficiently and transparently.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card style={cardStyle}>
              <Card.Img variant="top" src="/images/f2.jpg" />
              <Card.Body style={cardBodyStyle}>
                <Card.Title>Status Tracking and History</Card.Title>
                <Card.Text>
                  Allows users to view the current status of their leave requests (e.g., pending, approved,
                  rejected) and any comments from the approver. Provides access to past leave requests and
                  their statuses, which helps in managing and reviewing leave records over time.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card style={cardStyle}>
              <Card.Img variant="top" src="/images/f3.jpg" />
              <Card.Body style={cardBodyStyle}>
                <Card.Title>User Interface and Accessibility</Card.Title>
                <Card.Text>
                  Ensures the leave application form is accessible on various devices, including desktops,
                  tablets, and smartphones. Simple and intuitive design to ensure that users can easily
                  navigate and complete the form without confusion.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Content;
