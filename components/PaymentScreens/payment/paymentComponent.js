import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import styles from './paymentStyles'
import StripeApp from '../Stripe/StripeApp'

const PaymentComponent = () => {
    const Navigation = useNavigation();

    const route = useRoute();
    return (
        <>
        <View style={styles.card}>
            <View style={styles.body}>
                <View>
                   
                   <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                   <Text style={styles.monthlyprice}>₹{route.params.monthlyprice ? route.params.monthlyprice : '300'}</Text>
                   <Text style={{color:'black'}}>/month</Text>     
                  </View> 
                  <Text>Lifeaholic Premium</Text>

                </View>

                <View>
                <View style={{display:'flex',flexDirection:'row',alignItems:'center', backgroundColor:'black', borderRadius: 6, padding: 5}}>
                <Text style={{color:'white'}}>Selected Plan</Text>
                </View>  
                     <Text style={styles.validity}>{route.params.validity ? route.params.validity : '3'}</Text>                                    
                </View>



            </View>
            <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={()=> Navigation.goBack()} >
                            <Text style={styles.btnText}>Change Plan</Text>
                        </TouchableOpacity>
            </View>
        </View>

        <View style={styles.header}>
                <Text style={styles.name}>Please fill the following details</Text>
            </View>

            <StripeApp amount={route.params.monthlyprice ? route.params.monthlyprice : '300' } />
        </>
    )
}

export default PaymentComponent