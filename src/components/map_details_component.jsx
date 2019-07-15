import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';


const useStyles = makeStyles(theme => ({
    buttonStyle: {
        height: '5%',
        marginLeft: '1%',
        marginTop: '2%'
    },
    select:{
        float:'left',
        width: 100,
    },
    textField: {
        width: 200,
    },
    label:{
        fontSize:'0.8rem',
        float: 'left'
    },
    dropDown:{
        width: 200
    },
}));
export const selectWrapper = {
        width:'15%',
        paddingRight:'1%',
        marginTop:'2%',
        paddingLeft:'2%'
};

export const detailsWrapper = {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '28%'
};


export default function MapDetails(props) {
    const classes = useStyles();

    return (
        <div style={detailsWrapper}>
            <TextField
                id="standard-number"
                label="Latitude"
                type="number"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
                value={props.latitude}
                onChange={props.handleLatitudeChange}
            />
            <div style={{paddingRight:'2%'}}/>
            <TextField
                id="standard-number"
                label="Longitude"
                type="number"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
                value={props.longitude}
                onChange={props.handleLongitudeChange}
            />
            <div style={selectWrapper}>
                <InputLabel htmlFor="radial-distance" className={classes.label}>Radial Distance</InputLabel>
                <Select
                    input={<Input id="radial-distance" className={classes.select}/>}
                    inputProps={{
                        name: 'distance',
                        id: 'radial-distance',
                    }}
                    MenuProps={{ classes: { paper: classes.dropDown } }}
                    onChange={props.handleRadialDistanceChange}
                    value={props.radialDistance}
                >
                    <MenuItem value={2}>2 KM</MenuItem>
                    <MenuItem value={5}>5 KM</MenuItem>
                    <MenuItem value={10}>10 KM</MenuItem>
                </Select>
            </div>
            <Button variant="contained" color="primary" className={classes.buttonStyle} onClick={props.findCarHandler}>
               GO
            </Button>
        </div>);
}

