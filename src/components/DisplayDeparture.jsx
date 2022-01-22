import React, { useContext } from 'react';
import {Card, CardActions, CardContent, Button, Typography, makeStyles } from '@material-ui/core';
import { multiStepContext } from '../StepContext';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function DisplayDeparture() {
    
    const {setStep, setFinalData, setUserData, finalData, userData } = useContext(multiStepContext)
    const classes = useStyles();
    console.log(userData)

    function handleReset() {
        setFinalData([]);
        setUserData([]);
        setStep(1);
    }
    if(finalData){
        console.log(finalData);
    }
    return (

        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Next Departure
                </Typography>
                <br />
                <Typography variant="body2" component="h2">
                    <b>{finalData != null ? finalData : <span style={{color:"red"}}>No departure available for now</span>}</b>
                </Typography>
            </CardContent>
            <CardActions  style={{display:'flex', justifyContent:'center'}}>
            <Button variant="contained" onClick={()=>setStep(3)} color="secondary">Back</Button><span> </span>
                <Button variant="contained" color="primary" size="small" onClick={()=> handleReset()}>Reset</Button>
            </CardActions>
        </Card>
    );
}

export default DisplayDeparture;
