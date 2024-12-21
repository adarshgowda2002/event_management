import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventManagement from './components/EventManagement';
import AttendeeManagement from './components/AttendeeManagement';
import TaskTracker from './components/TaskTracker';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<EventManagement />} />
                <Route path="/attendees" element={<AttendeeManagement />} />
                <Route path="/tasks" element={<TaskTracker />} />
            </Routes>
        </Router>
    );
}

export default App;
