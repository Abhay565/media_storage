import { Image, PixelRatio, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { textSize } from '../constant/font';
import Colors from '../constant/colors';
import LoginScreens from '../component/LoginScreens';
import SignUpScreeen from '../component/SignUpScreeen';

const MainPage = () => {

    const [page, setPage] = useState(true);

    const toggleFunction =(status)=>{
        setPage(status);
    }
  return (
    <View style={styles.main}>
        <Image source={require("../images/icon.jpg")} style={styles.image} />
      <View style={styles.toggle}>
         <TouchableOpacity style={page=== true? styles.touch: styles.unTouch} onPress={()=>toggleFunction(true)} > 
            <Text style={page===true? styles.touchText:styles.unTouchText}>Login</Text>
         </TouchableOpacity>
         <TouchableOpacity style={page=== false? styles.touch: styles.unTouch} onPress={()=>toggleFunction(false)}>
            <Text style={page===false? styles.touchText:styles.unTouchText}>SignUp</Text>
         </TouchableOpacity>
      </View>
      { page === true && <LoginScreens/>  }
      { page === false && <SignUpScreeen/> }
    </View>
  )
}

export default MainPage

const imageWidth = 90;
const imageHeight = 60;
const pixelRatio = PixelRatio.get();
const imageWidthInPixels = imageWidth * pixelRatio;
const imageHeightInPixels = imageHeight * pixelRatio;
const styles = StyleSheet.create({
    main:{
        flex: 1,
    },
    image:{
        alignSelf: 'center',
     height:  imageHeightInPixels,
     width: imageWidthInPixels
    },
    toggle:{
     flexDirection: 'row',
     borderWidth: 1,
     marginHorizontal: "6%",
     paddingVertical: "1%",
     borderRadius: textSize.FONT_SIZE_16,
     justifyContent: 'center'
    },
    touch:{
        backgroundColor: Colors.button,
        paddingVertical: "4%",
        paddingHorizontal: '18%',
        borderRadius: textSize.FONT_SIZE_14
    },
    unTouch:{
        paddingVertical: "3%",
        paddingHorizontal: '16%',
        borderRadius: textSize.FONT_SIZE_12
    },
    touchText:{
        color: Colors.white,
        fontSize: textSize.FONT_SIZE_16
    },
    unTouchText:{
        color: Colors.grey_text,
        fontSize: textSize.FONT_SIZE_16
    }

})