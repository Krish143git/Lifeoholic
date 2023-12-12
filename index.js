import { registerRootComponent } from 'expo';

import App from './App';
import {io} from "socket.io-client"

export const socket = io("https://server-domain.com")

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
