import {  Chip, Avatar } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function PrependTimeChip(props) {
    const {children, ...domProps} = props;
    console.log(domProps);
    return (
        <Chip avatar={<AccessTimeIcon fontSize='small'  />}  {...domProps} />
    )
}

export default PrependTimeChip