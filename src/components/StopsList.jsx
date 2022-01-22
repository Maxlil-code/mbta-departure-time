import react, { useState, useEffect, useContext } from "react";
import { Button, InputLabel, Select, MenuItem, FormHelperText, FormControl, makeStyles } from '@material-ui/core';
import apiClient from "../api/api";
import { multiStepContext } from "../StepContext";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 400,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


function StopsList() {
    const { setStep, userData, setUserData } = useContext(multiStepContext);
    const [stops, setStops] = useState([]);
    const [error, setError] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        async function fetchStops(){
            await apiClient.get('/stops?filter[route]=' + userData["route"])
            .then(res => setStops(res.data.data))
            .catch(error => alert(error.message + ": Please refresh the page"))
        }
        fetchStops();
    }, [])

    const handleStopsChange = (e) => {
        setUserData({ ...userData, "stop": e.target.value });
    }

    const handleClick = (e) => {
        if (!userData.stop) {
            setError(true);
        } else {
            setStep(3);
        }
    }

    return (
        <div>
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel id="routes-label">Select a Stop</InputLabel>
                    <Select labelId="routes-label" defaultValue="" value={userData.stop} onChange={handleStopsChange}>
                        <MenuItem value=""><em>None</em></MenuItem>
                        {
                            stops.map((stop) => (
                                <MenuItem key={stop.id} value={stop.id}>{stop.attributes.name}</MenuItem>
                            ))
                        }
                    </Select>
                    {error ? <FormHelperText style={{ color: 'red' }}>This is required!</FormHelperText> : <FormHelperText>Fill in this Input</FormHelperText>}
                </FormControl>
            </div>
            <div>
                <Button variant="contained" onClick={() => setStep(1)} color="secondary">Back</Button><span>    </span>
                <Button variant="contained" onClick={() => handleClick()} color="primary">Next</Button>
            </div>
        </div>
    );
}

export default StopsList;
