import React from 'react'
import ActivitiesComponent from './activitiesComponents';

const ActivitiesContainer = () => {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  return (
    <>
    <ActivitiesComponent  toggleSwitch={toggleSwitch} isEnabled={isEnabled} />
    </>
  )
}

export default ActivitiesContainer