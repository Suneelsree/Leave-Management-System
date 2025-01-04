import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const Popup = () => {
    return (
        <Modal show={true} centered>
            <Modal.Body>
                <div className="text-center">
                    <p>Leave Applied Successfully!</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => window.location.replace("student-dashboard.html")}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Popup;
