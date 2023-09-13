import React from 'react'
import { Button } from '@mui/material';

function ErrorButton(props) {
    const { children, handler } = props;
    return (
        <Button onClick={handler} style={{ color: "#f73378" }} color="error" variant='text'>
            {children}
        </Button>
    )
}

export default ErrorButton