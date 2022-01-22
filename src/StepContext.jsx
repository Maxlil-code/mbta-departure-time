import React, { createContext, useState } from 'react';
import apiClient from './api/api';
import App from './App';



export const multiStepContext = createContext();
function StepContext() {

  const [currentStep, setStep] = useState(1);
  const [userData, setUserData] = useState({route: "", stop: "", direction: ""});
  const [finalData, setFinalData] = useState(null);

  async function submitData() {
    await apiClient.get('/predictions?filter[stop]=' + userData.stop + '&filter[direction_id]=' + userData.direction + '&sort=departure_time&page[limit]=1')
      .then((response) => {
        const isoTime = (response.data.data[0].attributes.departure_time);
        const myArray = isoTime.split("T")
        const timeArr = myArray[1].split("-")
        setFinalData(timeArr[0])
      })
      .catch (error => alert(error.message + ": Please refresh the page"))
}

return (
  <div>
    <multiStepContext.Provider value={{ currentStep, setStep, userData, setUserData, finalData, setFinalData, submitData }}>
      <App />
    </multiStepContext.Provider>
  </div>
);
}

export default StepContext;
