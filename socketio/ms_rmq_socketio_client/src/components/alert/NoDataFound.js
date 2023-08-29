import React from 'react'
import {  Grid, Chip } from '@mui/material';

function NoDataFound() {
    return (
        <Grid display="flex" justifyContent="center" alignItems="center">
            <Chip label="No Data Found" sx={{ color: '#ff5252', borderColor: '#ff5252' }} variant='outlined' />
        </Grid>
    )
}

export default NoDataFound