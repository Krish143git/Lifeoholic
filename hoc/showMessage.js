import Toast from 'react-native-simple-toast';

export const showMessage = (toast) => {
    Toast.show(toast.text, Toast.LONG, {textColor: toast?.color ? toast.color : '#000'})
}



