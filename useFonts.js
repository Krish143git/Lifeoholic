import * as Font from 'expo-font';

export default useFonts = async() => {
    await Font.loadAsync({
        kollektif: require('./assets/fonts/Kollektif.ttf'),
        kollektif_bold: require('./assets/fonts/Kollektif-Bold.ttf')
    })
}