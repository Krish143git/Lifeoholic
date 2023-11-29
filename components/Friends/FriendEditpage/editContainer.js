import { View, Text } from 'react-native'
import React from 'react'
import EditComponent from './editComponent';

const EditContainer = () => {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <>
       <EditComponent toggleSwitch={toggleSwitch} isEnabled={isEnabled} />
    </>
  )
}

export default EditContainer