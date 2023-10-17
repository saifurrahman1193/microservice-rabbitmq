import React from 'react'
import { Button } from '@mui/material';

function WarningButton(props) {
    const { children, handler, ...domProps } = props;
    return (
        <Button onClick={handler}  variant="contained" size='small' color="warning" {...domProps}>
            {children}
        </Button>
    )
}

export default WarningButton