import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { StyledTableHeaderCell } from 'src/components/table/style.js';
import DynamicTable from 'src/components/table/DynamicTable';
import { MEETING } from 'src/services/api/api_path/APIPath.js';
import axios from 'src/services/api/axios_config/Axios.js'
import useAxiosFunction from 'src/services/api/hooks/useAxiosFunction.js';
import { Card, Grid } from '@mui/material';
import CircularIndeterminate from 'src/components/loader/CircularIndeterminate.js';

const List = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        handle_getMeetings() {
            handleGetMeetings();
        }
    }));

    // Axios Hook
    const [meetingsGetRes, errorGetMeetings, loadingGetMeetings, axiosGetMeetings] = useAxiosFunction();

    const [meetings, setMeetings] = useState([]);  // meetings

    const meetingTable = {
        styles: {
            table: {
                maxHeight: '70vh',
            },
            noDataFoundStyles: {
                marginY: '20px',
            }
        },
        columns: [
            { id: '_id', label: 'ID', },
            { id: 'title', label: 'Title', },
            { id: 'description', label: 'Description', },
            { id: 'time', label: 'Time', },
            { id: 'location', label: 'Location', headerStyle: StyledTableHeaderCell },
        ],
        config:{
            noDataFound: true,
        }
    }

    // On Load 
    useEffect(() => {
        handleGetMeetings();
    }, []);

    const handleGetMeetings = async (event) => {
        await axiosGetMeetings({
            axiosInstance: axios,
            method: 'get',
            url: MEETING,
        })
    }

    useEffect(() => {
        setMeetings(meetingsGetRes?.data)
    }, [meetingsGetRes]);

    return (
        <Grid item xs={12}>
            <Card>
                {loadingGetMeetings && <CircularIndeterminate />}
                {
                    !loadingGetMeetings  &&
                    <DynamicTable styles={meetingTable?.styles} columns={meetingTable?.columns} data={meetings} tableType='sticky-header' config={meetingTable?.config} />
                }
            </Card>
        </Grid>
    )
})

export default List