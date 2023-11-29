import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'
import { Signin } from '../components'

const AuthHoc = (WrappedComponent) => {

    function Auth(props) {
        const [state, setState] = useState({
            token: '',
            user: {},
            userId: null
        });

        AsyncStorage.getItem('token').then(token => {
            AsyncStorage.getItem('personalData').then(user => {
                setState({
                    token: token,
                    user: JSON.parse(user),
                    userId: state.user._id
                })
            })
        })


        const { token, user,userId } = state;

        if (!token || token === null || token === undefined) {
            return <Signin />
        } else {
            return <WrappedComponent token={token} user={user} userId={userId} />
        }

    }

    return Auth


}

export default AuthHoc