import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { approveRequest, rejectRequest } from '../features/leaveSlice';

const RequestTable = () => {
    const dispatch = useDispatch();
    const requests = useSelector(state => state.leave.requests);

    const handleApprove = (request) => {
        dispatch(approveRequest(request));
    };

    const handleReject = (request) => {
        dispatch(rejectRequest(request));
    };

    return (
        <><h2 style={{textAlign:'center'}}>Request Table</h2>
        <Table striped bordered hover className="mt-4">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Student Id</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Reason</th>
                    <th>Received Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {requests.map((request, index) => (
                    <tr key={index}>
                        <td>{request.name}</td>
                        <td>{request.studentId}</td>
                        <td>{request.fromDate}</td>
                        <td>{request.toDate}</td>
                        <td>{request.reasonType}</td>
                        <td>{request.receivedDate}</td>
                        <td>
                            <Button variant="success" onClick={() => handleApprove(request)}>Approve</Button>
                            <Button variant="danger" onClick={() => handleReject(request)}>Reject</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table></>
    );
};

export default RequestTable;
