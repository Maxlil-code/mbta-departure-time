import { useState, useEffect, useContext } from "react";
import { InputLabel, Select, MenuItem, FormHelperText, FormControl, Button, makeStyles } from '@material-ui/core';
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

function RoutesList() {
    const {setStep, userData, setUserData} = useContext(multiStepContext);
    const [routes, setRoutes] = useState([]);
    const [error, setError] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        async function fetchRoutes(){
            await apiClient.get('/routes?filter[type]=0,1')
            .then(res => setRoutes(res.data.data))
            .catch(error => alert(error.message + ": Please refresh the page"))
        }
        fetchRoutes();
    }, [])

    const handleRouteChange = (e) => {
        setUserData({...userData,"route": e.target.value})
    };

    const handleClick = (e) => {
        if(!userData.route) {
            setError(true);
        }else{
            setStep(2);
        }
    }
    return (
        <div>
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel size="large" id="routes-label">Select a Route</InputLabel>
                    <Select labelId="routes-label" defaultValue="" value={userData["route"]} onChange={handleRouteChange}>
                        {
                            routes.map((route) => (
                                <MenuItem key={route.id} value={route.id}>{route.attributes.long_name}</MenuItem>
                            ))
                        }
                    </Select>
                    {error ? <FormHelperText style={{color:'red'}}>This is required!</FormHelperText> : <FormHelperText>Fill in this Input</FormHelperText>}
                </FormControl>
            </div>
            <div>
                <Button variant="contained" onClick={() => handleClick()} color="primary">Next</Button>
            </div>
        </div>

    );
}

export default RoutesList;