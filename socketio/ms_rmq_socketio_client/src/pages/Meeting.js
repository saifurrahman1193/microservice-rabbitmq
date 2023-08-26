import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, CardHeader, Avatar, IconButton } from '@mui/material';
import useAxiosFunction from 'src/services/api/hooks/useAxiosFunction.js';
import axios from 'src/services/api/axios_config/Axios.js'
import { MEEING } from 'src/services/api/api_path/APIPath.js';

function Meeting() {

    const [dataMeeting, errorMeeting, loadingMeeting, axiosFetchMeeting] = useAxiosFunction();

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
            url: MEEING,
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

                {loadingMeeting && <p>Loading...</p>}
                {!loadingMeeting && errorMeeting && <p className="errMsg">{errorMeeting}</p>}
                {!loadingMeeting && !errorMeeting && dataMeeting &&
                    <span>{dataMeeting?.message}</span>
                }
                {!loadingMeeting && !errorMeeting && !dataMeeting && <p>No data to display</p>}
            </CardContent>
        </Card>

    );
};

export default Meeting;


// Meetings Management (title, description, schedule_date, start_time, end_time, location, agenda, meeting_type, participants, permissions)