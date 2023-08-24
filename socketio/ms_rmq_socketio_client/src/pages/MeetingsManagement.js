import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent } from '@mui/material';

function MeetingsManagement() {

    const [formInitial, setFormInitial] = useState({
        title: '',
        description: '',
        date: '',
    });
    const [formData, setFormData] = useState(formInitial)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(formData);
    }

    useEffect(() => {
        setFormData(formInitial)
    }, [formInitial])

    return (
        <Card>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <TextField label="Meeting Title" name="title" value={formData?.title} onChange={handleChange} />
                    <TextField label="Meeting Description" name="description" value={formData?.description} onChange={handleChange} />

                    <Button type='submit'>Submit</Button>
                </form>
            </CardContent>
        </Card>

    );
};

export default MeetingsManagement;


// Meetings Management (title, description, schedule_date, start_time, end_time, location, agenda, meeting_type, participants, permissions)