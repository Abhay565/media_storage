import {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {textSize} from '../constant/font';
import Colors from '../constant/colors';
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.main}>
        <Text style={styles.logo}>Logo</Text>
      <Image source={require('../images/welcome.png')} style={styles.image} />
      <TouchableOpacity style={styles.touch}  onPress={()=>navigation.navigate("mainpage")}>
        <Text style={styles.text}>Welcome & Continue</Text>
      </TouchableOpacity>
      <View style={styles.lowerContainer}>
        <Text style={styles.lowerText}>
          Press the Button to continue with the login and signup and you can
          also store the information in this app
        </Text>
      </View>
    </View>
  );
};

export default Welcome;
const imageWidth = 70;
const imageHeight = 100;
const pixelRatio = PixelRatio.get();
const imageWidthInPixels = imageWidth * pixelRatio;
const imageHeightInPixels = imageHeight * pixelRatio;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: "10%"
  },
  image: {
    alignSelf: 'center',
    height: imageHeightInPixels,
    width: imageWidthInPixels,
  },
  logo:{
  fontSize: textSize.FONT_SIZE_28,
  fontWeight: "800",
  textAlign: 'center',
  color: Colors.button

  },
  touch: {
    marginTop: '20%',
    marginHorizontal: '10%',
    paddingVertical: '4%',
    backgroundColor: Colors.button,
    borderRadius: 10,
  },
  text: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: textSize.FONT_SIZE_16,
    fontWeight: '500',
  },
  lowerContainer: {
    alignSelf: 'center',
    width: '50%',
  },
  lowerText: {
    marginTop: '10%',
    textAlign: 'center',
    fontSize: textSize.FONT_SIZE_12,
    fontWeight: '500',
    color: Colors.grey_text,
  },
});
