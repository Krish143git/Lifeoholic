
import React from 'react'
import PushComponent from './pushComponent';

const PushContainer = () => {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <>
      <PushComponent toggleSwitch={toggleSwitch} isEnabled={isEnabled} />
    </>
  )
}

export default PushContainer