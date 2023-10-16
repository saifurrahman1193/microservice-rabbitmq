import {  Chip } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function PrependTimeChip(props) {
    const {children, ...domProps} = props;
    return (
        <Chip avatar={<AccessTimeIcon fontSize='small'  />}  {...domProps} />
    )
}

export default PrependTimeChip