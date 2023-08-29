import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

export default function CircularIndeterminate() {
    return (
        <Grid display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
        </Grid>
    );
}