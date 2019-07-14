import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MapContainer from "./map_container";

export class AppContainer extends React.Component{
render() {
    return (
        <div>
        <AppBar position="static" className={{width:'80px'}}>
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="Menu">
            </IconButton>
            <Typography variant="h6">
                Drive Easy
            </Typography>
        </Toolbar>
        </AppBar>
        <MapContainer/>
        </div>
    );
}
}
export default AppContainer;