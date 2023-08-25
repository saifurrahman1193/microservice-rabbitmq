import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, CardHeader, Avatar, IconButton } from '@mui/material';
import useAxiosFunction from 'src/services/api/hooks/useAxiosFunction.js';
import axios from 'src/services/api/axios_config/Axios.js'
import { MEEING_CREATE } from 'src/services/api/api_path/APIPath.js';

function Meeting() {

    const [dataMeeting, errorMeeting, loading, axiosFetchMeeting] = useAxiosFunction();

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

    const handleSubmit = async (event) => {
        event.preventDefault()

        await axiosFetchMeeting({
            axiosInstance: axios,
            method: 'post',
            url: MEEING_CREATE,
            requestConfig: {
                data: { ...formData }
            }
        })
    }

    useEffect(() => {
        setFormData(formInitial)
    }, [formInitial])

    useEffect(() => {
        console.log(dataMeeting);
    }, [dataMeeting])

    return (
        <Card>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <TextField label="Meeting Title" name="title" value={formData?.title} onChange={handleChange} />
                    <TextField label="Meeting Description" name="description" value={formData?.description} onChange={handleChange} />

                    <Button type='submit'>Submit</Button>
                </form>
                <CardHeader
                    title={dataMeeting }
                />
            </CardContent>
        </Card>

    );
};

export default Meeting;


// Meetings Management (title, description, schedule_date, start_time, end_time, location, agenda, meeting_type, participants, permissions)