import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

export default function CircularIndeterminate(props) {
    const { children, handler, ...domProps } = props;

    return (
        <Grid display="flex" justifyContent="center" alignItems="center">
            <CircularProgress  {...domProps}>{children}</CircularProgress>
        </Grid>
    );
}