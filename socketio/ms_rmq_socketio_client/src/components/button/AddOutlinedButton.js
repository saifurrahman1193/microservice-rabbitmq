import React from 'react'
import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function AddOutlinedButton(props) {
    const { children, handler, ...domProps } = props;
    return (

        <Button onClick={handler} variant="outlined" sx={{ margin: '15px' }} startIcon={<AddCircleIcon />} CellRender  {...domProps}>
            {children}
        </Button>
    )
}

export default AddOutlinedButton