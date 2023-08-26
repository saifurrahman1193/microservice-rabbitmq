import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import useAxiosFunction from 'src/services/api/hooks/useAxiosFunction.js';
import axios from 'src/services/api/axios_config/Axios.js'
import { MEETING } from 'src/services/api/api_path/APIPath.js';
import { getTodayStartTime, getTodayEndTime, getSpecificDateTimeAMPM } from '../utils/CommonHelpers.js'
import moment from 'moment'; // If you're using ES Modules
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

function Meeting() {

    const [meetings, setMeetings] = useState([]);  // meetings

    // Axios Hook
    const [meeting_create_res, errorCreateMeeting, loadingMeeting, axiosCreateMeeting] = useAxiosFunction();
    const [meetingsGetRes, errorGetMeetings, loadingGetMeetings, axiosGetMeetings] = useAxiosFunction();

    const [formInitial, setFormInitial] = useState({
        title: '',
        description: '',
        date: null,
        start_time: moment(getTodayStartTime()), // moment(getTodayStartTime())
        end_time: null,
        location: '',
    });

    const [formData, setFormData] = useState(formInitial)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleMeetingCreateSubmit = async (event) => {
        event.preventDefault()

        await axiosCreateMeeting({
            axiosInstance: axios,
            method: 'post',
            url: MEETING,
            requestConfig: {
                data: { ...formData }
            }
        })

        handleGetMeetings()
    }

    const handleGetMeetings = async (event) => {
        await axiosGetMeetings({
            axiosInstance: axios,
            method: 'get',
            url: MEETING,
        })
    }

    useEffect(() => {
        setFormData(formInitial)
    }, [formInitial])

    useEffect(() => {

    }, [meeting_create_res])

    // On Load 
    useEffect(() => {
        handleGetMeetings();
    }, []);

    useEffect(() => {
        setMeetings(meetingsGetRes?.data)
    }, [meetingsGetRes]);


    return (
        <Card>
            <CardContent>
                <form onSubmit={handleMeetingCreateSubmit}>
                    <TextField label="Meeting Title" name="title" value={formData?.title} onChange={handleChange} required />
                    <TextField label="Meeting Description" name="description" value={formData?.description} onChange={handleChange} required />
                    <TextField label="Meeting Location" name="location" value={formData?.location} onChange={handleChange} required />
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker
                                label="Start Time"
                                // viewRenderers={{
                                    // hours: renderTimeViewClock,
                                    // minutes: renderTimeViewClock,
                                    // seconds: renderTimeViewClock,
                                // }}
                                defaultValue={formData?.start_time}
                                onChange={(newValue) => {
                                    setFormData((prev) => ({...prev,  start_time : moment(newValue).format('YYYY-MM-DD HH:mm:ss') }))
                                }}
                                format="YYYY-MM-DD HH:mm:ss"
                            />
                        </DemoContainer>
                    </LocalizationProvider>

                    <Button type='submit'>Submit</Button>
                </form>

                {/* {loadingMeeting && <p>Loading...</p>}
                {!loadingMeeting && errorCreateMeeting && <p className="errMsg">{errorCreateMeeting}</p>}
                {!loadingMeeting && !errorCreateMeeting && meeting_create_res &&
                    <span>{meeting_create_res?.message}</span>
                }
                {!loadingMeeting && !errorCreateMeeting && !meeting_create_res && <p>No data to display</p>} */}
            </CardContent>

            <CardContent>
                {loadingGetMeetings && <Paper style={{ justifyContent: 'center', alignItems: 'center' }}>Loading...</Paper>}
                {!loadingGetMeetings && errorCreateMeeting && <p className="errMsg">{errorCreateMeeting}</p>}

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Location</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!loadingGetMeetings &&
                                meetings?.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row?._id}</TableCell>
                                        <TableCell>{row?.title}</TableCell>
                                        <TableCell>{row?.description}</TableCell>
                                        <TableCell>{row?.location}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>

        </Card>

    );
};

export default Meeting;


// Meetings Management (title, description, schedule_date, start_time, end_time, location, agenda, meeting_type, participants, permissions)