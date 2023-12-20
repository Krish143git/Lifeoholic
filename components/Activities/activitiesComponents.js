import { View, Text, FlatList, Switch,AsyncStorage, SafeAreaView, StatusBar } from 'react-native'
import { useEffect, useState,TouchableOpacity  } from 'react';
import React from 'react';
import styles from './activitiesStyles';


const ActivitiesComponents = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  useEffect(() => {
    const loadSwitchValue = async () => {
      try {
        const value = await AsyncStorage.getItem('isEnabled');
        if (value !== null) {
          setIsEnabled(JSON.parse(value));
        }
      } catch (error) {
        console.log('Error loading switch value: ', error);
      }
    };

    loadSwitchValue();
  }, []);

  useEffect(() => {
    const saveSwitchValue = async () => {
      try {
        await AsyncStorage.setItem('isEnabled', JSON.stringify(isEnabled));
      } catch (error) {
        console.log('Error saving switch value: ', error);
      }
    };

    saveSwitchValue();
  }, [isEnabled]);

  return (
    <>
    <SafeAreaView style={{ flex:1,paddingTop: StatusBar.currentHeight}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <FlatList
            data={[
              { key: 'See all Latest Activities' },
              { key: 'Check Older Activities' },

            ]}
            renderItem={({ item }) => {
              return (
                <View >

                  <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',borderBottomColor: '#e3e2e1', alignItems: 'center', borderBottomWidth: 1, marginHorizontal: 9 ,paddingHorizontal:9}}>
                    <View>
                      <Text style={[styles.item, item.style]}>{item.key}</Text>
                    </View>

                    <View>
                      <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                      />
                      {/* <TouchableOpacity onPress={() => setToggleValue(!toggleValue)}>
                      </TouchableOpacity> */}
                    </View>
                  </View>
                </View>
              )
            }
            }
          />

        </View>

        <View >
          <Text style={styles.names}>Saved Profiles</Text>
          <Text style={styles.names}>Saved Post</Text>
        </View>

      </View>
      </SafeAreaView>

    </>

  )
}

export default ActivitiesComponents;