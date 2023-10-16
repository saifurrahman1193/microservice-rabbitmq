import React from 'react'
import { Grid, Chip } from '@mui/material';

function NoDataFound(props) {
    const { children, ...domProps } = props;
    return (
        <Grid display="flex" justifyContent="center" alignItems="center">
            <Chip sx={{ color: '#ff5252', borderColor: '#ff5252', marginY: '20px' }} variant='outlined'  {...domProps}>{children}</Chip>
        </Grid>
    )
}

export default NoDataFound