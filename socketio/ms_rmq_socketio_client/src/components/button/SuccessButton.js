import React from 'react'
import { Button } from '@mui/material';

function SuccessButton(props) {
    const { children, handler, ...domProps } = props;
    return (
        <Button onClick={handler} style={{ background: "#4caf50" }} variant="contained" {...domProps}>
            {children}
        </Button>
    )
}

export default SuccessButton