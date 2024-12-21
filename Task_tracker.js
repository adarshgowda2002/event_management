import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskTracker = () => {
    const [tasks, setTasks] = useState([]);
    const [form, setForm] = useState({ name: '', deadline: '', status: 'Pending', attendeeId: '', eventId: '' });
    const [attendees, setAttendees] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchTasks();
        fetchAttendees();
        fetchEvents();
    }, []);

    const fetchTasks = async () => {
        const res = await axios.get('http://localhost:5000/tasks');
        setTasks(res.data);
    };

    const fetchAttendees = async () => {
        const res = await axios.get('http://localhost:5000/attendees');
        setAttendees(res.data);
    };

    const fetchEvents = async () => {
        const res = await axios.get('http://localhost:5000/events');
        setEvents(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/tasks', form);
        setTasks([...tasks, res.data]);
        setForm({ name: '', deadline: '', status: 'Pending', attendeeId: '', eventId: '' });
    };

    const handleStatusChange = async (id, status) => {
        await axios.put(`http://localhost:5000/tasks/${id}`, { status });
        fetchTasks();
    };

    return (
        <div>
            <h1>Task Tracker</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Task Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                />
                <input
                    type="date"
                    value={form.deadline}
                    onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                    required
                />
                <select
                    value={form.eventId}
                    onChange={(e) => setForm({ ...form, eventId: e.target.value })}
                    required
                >
                    <option value="">Select Event</option>
                    {events.map(event => (
                        <option value={event._id} key={event._id}>{event.name}</option>
                    ))}
                </select>
                <select
                    value={form.attendeeId}
                    onChange={(e) => setForm({ ...form, attendeeId: e.target.value })}
                    required
                >
                    <option value="">Assign Attendee</option>
                    {attendees.map(attendee => (
                        <option value={attendee._id} key={attendee._id}>{attendee.name}</option>
                    ))}
                </select>
                <button type="submit">Add Task</button>
            </form>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        {task.name} - {task.status}
                        <button onClick={() => handleStatusChange(task._id, 'Completed')}>Mark Completed</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskTracker;
