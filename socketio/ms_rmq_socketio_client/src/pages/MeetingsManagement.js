import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent } from '@mui/material';
import useAxiosFunction from 'src/services/api/hooks/useAxiosFunction.js';
import axios from 'src/services/api/axios_config/Axios.js'
import {API_BASE_URL, MEEING_CREATE} from 'src/services/api/api_path/APIPath.js';

function MeetingsManagement() {

    const [data, error, loading, axiosFetch] = useAxiosFunction();
    
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

        axiosFetch({
            axiosInstance: axios,
            method: 'post',
            url: MEEING_CREATE,
            requestConfig: {
                data: {...formData}
            }
        });
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