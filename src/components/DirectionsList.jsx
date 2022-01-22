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


function DirectionsList() {
    const {setStep, userData, setUserData, submitData} = useContext(multiStepContext);
    const [directions, setDirections] = useState([]);
    const [selected_direction, setSelected] = useState('');
    const [error, setError] = useState(false);
    const classes = useStyles();
    
    useEffect(() => {
        async function fetchDirections(){
            await apiClient.get('/routes/' + userData["route"])
            .then(res => setDirections(res.data.data.attributes.direction_destinations))
            .catch(error => alert(error.message))
        }
        fetchDirections();
    }, [])

    const handleDirectionChange = (e) => {
        setUserData({...userData,"direction": e.target.value});
        console.log(userData.direction)
        console.log('hello')
    }
    const handleClick = (e) => {
        if(userData.direction == null) {
            setError(true);
            console.log(userData)
        }else{
            submitData()
            setStep(4)
        }
    }

    return (
        <div>
            <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="routes-label">Select a Direction</InputLabel>
                <Select labelId="routes-label" defaultValue={null} value={userData.direction} onChange={handleDirectionChange}>
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        directions.map((direction, index) => (
                            <MenuItem key={index} value={index}>{direction}</MenuItem>
                        ))
                    }
                </Select>
                {error ? <FormHelperText style={{color:'red'}}>This field is required!</FormHelperText> : <FormHelperText>Fill in this Input</FormHelperText>}
            </FormControl>
            </div> 
            <div>
                <Button variant="contained" onClick={()=>setStep(2)} color="secondary">Back</Button><span> </span>
                <Button variant="contained" onClick={()=>handleClick()} color="primary">Submit</Button>
            </div>
        </div>
    );
}

export default DirectionsList;
