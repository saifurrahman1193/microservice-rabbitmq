import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { StyledTableHeaderCell } from 'src/components/table/style.js';
import DynamicTable from 'src/components/table/DynamicTable';
import { MEETING } from 'src/services/api/api_path/APIPath.js';
import { Card, Grid } from '@mui/material';
import CircularIndeterminate from 'src/components/loader/CircularIndeterminate.js';
import { getSpecificDateTimeAMPM } from 'src/utils/CommonHelpers.js';
import { getCall } from 'src/services/api/apiService.js';
import Action from 'src/pages/Meeting/Action.js';
import NoDataFound from 'src/components/alert/NoDataFound.js';

const List = forwardRef((props, ref) => {
    const { showAlert } = props;

    useImperativeHandle(ref, () => ({
        handle_getMeetings() {
            handleGetMeetings();
        }
    }));

    const handleGetMeetings = async (e) => {
        setMeetingsLoading(true);
        let response = await getCall(MEETING);

        if (response?.code === 200) {
            await processTableData(response?.data)
            setMeetingsLoading(false);
        } else {
            setMeetingsLoading(false)
        }
    }

    const [meetingLoading, setMeetingsLoading] = useState(false);
    const [meetings, setMeetings] = useState([]);  // meetings

    const meetingTable = {
        columns: [
            { id: '_id', label: 'ID' },
            { id: 'title', label: 'Title' },
            { id: 'description', label: 'Description' },
            { id: 'timerange', label: 'Time' },
            { id: 'location', label: 'Location', headerStyle: StyledTableHeaderCell },
            { id: 'action', label: 'Action' },
        ]
    }


    // On Load 
    useEffect(() => {
        handleGetMeetings();
    }, []);


    const processTableData = async (data) => {
        if (data) {
            data = data?.map((meeting) => ({
                ...meeting, // Spread the existing meeting object
                timerange: `${getSpecificDateTimeAMPM(meeting?.start_time)} - ${getSpecificDateTimeAMPM(meeting?.end_time)}`, // Calculate the timerange
                action: () => (
                    <Action data={meeting} handleGetMeetings={handleGetMeetings} showAlert={showAlert} />
                )
            }));
            setMeetings(data)
        }
    };

    return (
        <Grid item xs={12}>
            <Card>
                {meetingLoading && <CircularIndeterminate />}
                {
                    !meetingLoading && meetings?.length === 0 &&
                    <NoDataFound label="No Data Found!" />
                }
                {
                    !meetingLoading && meetings?.length !== 0 &&
                    <DynamicTable styles={meetingTable?.styles} columns={meetingTable?.columns} data={meetings} tabletype='basic' config={meetingTable?.config} />
                }
            </Card>
        </Grid>
    )
})

export default List