import React from 'react'
import { DialogActions } from '@mui/material';

function DialogActionsGeneral(props) {
    const { children, closeHandler, ...domProps } = props;
    return (
        <DialogActions sx={{ marginY: "6px", background: '#fafafa' }}  {...domProps}>
            {children}
        </DialogActions>
    )
}

export default DialogActionsGeneral