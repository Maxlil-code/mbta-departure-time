import './App.css';
import RoutesList from './components/RoutesList';
import StopsList from './components/StopsList';
import DirectionsList from './components/DirectionsList';
import { Stepper, StepLabel, Step, Box } from '@material-ui/core';
import { multiStepContext } from './StepContext';
import React, { useContext } from 'react';
import DisplayDeparture from './components/DisplayDeparture';

function App() {
  const { currentStep, finalData } = useContext(multiStepContext);
  function showStep(step) {
    switch (step) {
      case 1:
        return <RoutesList />
      case 2:
        return <StopsList />
      case 3:
        return <DirectionsList />
      case 4:
        return <DisplayDeparture />
    }
  }

  return (
    <div className="App">
      <div className="App-header">
        <Stepper style={{ width: '50%' }} activeStep={currentStep - 1} orientation='horizontal'>
          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
        </Stepper>
        {showStep(currentStep)}
      </div>
    </div>
  );
}

export default App;
