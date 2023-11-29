import { View, Text, FlatList, Switch } from 'react-native'
import React,{useEffect} from 'react';
import styles from './pushStyles';
import { Notifications } from 'expo';

const PushComponents = (props) => {

  async function requestPermission() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to show push notifications was denied');
    }
  }
  useEffect(() => {
    Notifications.addListener(handleNotification);
    requestPermission();
    return () => {
      Notifications.removeListener(handleNotification);
    };
  }, []);
  async function handleNotification(notification) {
    // Handle the notification here
    console.log(notification);
  }
  async function showNotification() {
    const notification = {
      title: 'My Notification Title',
      body: 'My Notification Body',
      data: {
        key1: 'value1',
        key2: 'value2',
      },
    };
    await Notifications.presentNotificationAsync(notification);
  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <FlatList
            data={[
              { key: 'In-App Notifications' },
              { key: 'Chat Notifications' },
              { key: 'Friend Requests' },
              { key: 'Interest Recieved' },
              { key: 'Friends Notifications' },
              { key: 'Business Notifications' },
              { key: 'Match Making Notifications' },
              { key: 'Travel Partner Notifications' },
              { key: 'Turn Off All Notifications' },

            ]}



            renderItem={({ item }) => {
              return (
                <View style={{
                  display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: '#e3e2e1',
                  borderBottomWidth: 1, marginHorizontal: 9 ,paddingHorizontal:20,paddingVertical:10
                }}>

                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                    <Text style={[styles.item, item.style]}>{item.key}</Text>

                  </View>

                  <View>
                    <Switch
                      trackColor={{ false: "#767577", true: "#81b0ff" }}
                      thumbColor={props.isEnabled ? "#f5dd4b" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={props.toggleSwitch}
                      value={props.isEnabled}
                    />
                  </View>
                </View>
              )
            }
            }
          />

        </View>

      </View>
     
    </>

  )
}

export default PushComponents;