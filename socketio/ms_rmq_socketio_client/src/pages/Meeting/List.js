import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { StyledTableHeaderCell } from 'src/components/table/style.js';
import TableBasic from 'src/components/table/TableBasic';
import { MEETING } from 'src/services/api/api_path/APIPath.js';
import { Card, Grid } from '@mui/material';
import CircularIndeterminate from 'src/components/loader/CircularIndeterminate.js';
import { getSpecificDateTimeDMYAMPM } from 'src/utils/DateTimeHelpers.js';
import { getCall } from 'src/services/api/apiService.js';
import Action from 'src/pages/Meeting/Action.js';
import NoDataFound from 'src/components/alert/NoDataFound.js';
import PrependTimeChip from 'src/components/chip/PrependTimeChip.js';
import PaginationButtons from 'src/components/pagination/PaginationButtons.js';

const List = forwardRef((props, ref) => {
    const { showAlert } = props;

    useImperativeHandle(ref, () => ({
        handle_getMeetings() {
            handleGetMeetings();
        }
    }));

    const handleGetMeetings = async (e, page = 1) => {
        setMeetingsLoading(true);
        let response = await getCall(MEETING, { page: page });

        if (response?.code === 200) {
            await processTableData(response?.data)
            setMeetingsLoading(false);
        } else {
            setMeetingsLoading(false)
        }
    }

    const [meetingLoading, setMeetingsLoading] = useState(false);
    const [meetings, setMeetings] = useState([]);  // meetings
    const [paginator, setPaginator] = useState({});  // meetings

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
            let result = data?.items?.map((meeting) => ({
                ...meeting,
                timerange: () => (
                    <PrependTimeChip label={`${getSpecificDateTimeDMYAMPM(meeting?.start_time)} - ${getSpecificDateTimeDMYAMPM(meeting?.end_time)}`} />
                ),
                action: () => (
                    <Action data={meeting} handleGetMeetings={handleGetMeetings} showAlert={showAlert} />
                )
            }));
            setPaginator(data?.paginator);
            setMeetings(result);
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
                    <>
                        <TableBasic
                            columns={meetingTable?.columns}
                            data={meetings}
                        />
                        <PaginationButtons paginator={paginator} handler={handleGetMeetings} />
                    </>

                }
            </Card>
        </Grid>
    )
})

export default List