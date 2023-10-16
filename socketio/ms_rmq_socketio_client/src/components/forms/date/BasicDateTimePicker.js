import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { checkIsError, getErrorMessage } from 'src/utils/ErrorHelpers.js';

function BasicDateTimePicker(props) {
    const { children, onChange, errors, name, label, format, ...domProps } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterMoment} >
            <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker
                    label= {label || ''}
                    onChange={onChange}
                    format= {format || "DD-MM-YYYY hh:mm a"}
                    slotProps={{
                        textField: {
                            helperText: getErrorMessage(errors, name),
                            error: checkIsError(errors, name),
                            size: 'small',
                            ...domProps
                        },
                    }}
                />
            </DemoContainer>
        </LocalizationProvider>
    )
}

export default BasicDateTimePicker