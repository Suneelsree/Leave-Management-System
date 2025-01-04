import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching requests
export const fetchRequests = createAsyncThunk('leave/fetchRequests', async () => {
    const response = await fetch('/api/requests'); // Adjust URL as needed
    return response.json();
});

// Default request and report values
const defaultRequest = {
    name: 'Mani',
    studentId: '21cs21',
    fromDate: '8/7/24',
    toDate: '20/7/24',
    reasonType: 'Sick Leave',
    receivedDate: '7/8/24',
    status: '',
};

const getInitialState = () => {
    // Retrieve from local storage or use default values
    const requestsFromStorage = JSON.parse(localStorage.getItem('request')) || [];
    const reportFromStorage = JSON.parse(localStorage.getItem('report')) || [];

    return {
        requests: requestsFromStorage.map(request => ({
            ...defaultRequest,
            ...request
        })),
        report: reportFromStorage.map(request => ({
            ...defaultRequest,
            ...request
        }))
    };
};

const leaveSlice = createSlice({
    name: 'leave',
    initialState: getInitialState(),
    reducers: {
        addLeaveRequest: (state, action) => {
            const newRequest = { ...defaultRequest, ...action.payload };
            state.requests.push(newRequest);
            localStorage.setItem('request', JSON.stringify(state.requests));
        },
        approveRequest: (state, action) => {
            const { studentId } = action.payload;
            const approvedRequest = { ...defaultRequest, ...action.payload, status: 'Approved' };
            
            // Remove the approved request from `requests`
            state.requests = state.requests.filter(request => request.studentId !== studentId);
            // Add to `report`
            state.report.push(approvedRequest);

            // Update local storage
            localStorage.setItem('request', JSON.stringify(state.requests));
            localStorage.setItem('report', JSON.stringify(state.report));
        },
        rejectRequest: (state, action) => {
            const { studentId } = action.payload;
            const rejectedRequest = { ...defaultRequest, ...action.payload, status: 'Rejected' };

            // Remove the rejected request from `requests`
            state.requests = state.requests.filter(request => request.studentId !== studentId);
            // Add to `report`
            state.report.push(rejectedRequest);

            // Update local storage
            localStorage.setItem('request', JSON.stringify(state.requests));
            localStorage.setItem('report', JSON.stringify(state.report));
        },
        updateRequestStatus: (state, action) => {
            const { studentId, status } = action.payload;

            // Update the status in requests
            state.requests = state.requests.map(request =>
                request.studentId === studentId
                    ? { ...request, status }
                    : request
            );
            // Update the status in report if the request exists there
            state.report = state.report.map(request =>
                request.studentId === studentId
                    ? { ...request, status }
                    : request
            );

            // Update local storage
            localStorage.setItem('request', JSON.stringify(state.requests));
            localStorage.setItem('report', JSON.stringify(state.report));
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRequests.fulfilled, (state, action) => {
            const updatedRequests = action.payload.map(request => ({
                ...defaultRequest,
                ...request
            }));
            state.requests = updatedRequests;
            localStorage.setItem('request', JSON.stringify(state.requests));
        });
    },
});

// Export actions and reducer
export const { addLeaveRequest, approveRequest, rejectRequest, updateRequestStatus } = leaveSlice.actions;
export default leaveSlice.reducer;
