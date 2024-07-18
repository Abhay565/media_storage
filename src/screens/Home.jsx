import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Camera,
  useCameraDevice,
} from 'react-native-vision-camera';
import Colors from '../constant/colors';
import { textSize } from '../constant/font';
import Video from 'react-native-video';

const Home = () => {
  const [openCamera, setOpenCamera] = useState(false);
  const [media, setMedia] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const device = useCameraDevice('back');
  const camera = useRef(null);
  const recordingInterval = useRef(null);

  useEffect(() => {
    checkPermission();
  }, []);

  useEffect(() => {
    if (isRecording) {
      recordingInterval.current = setInterval(() => {
        setRecordingTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(recordingInterval.current);
      setRecordingTime(0);
    }

    return () => clearInterval(recordingInterval.current);
  }, [isRecording]);

  const takePicture = async () => {
    try {
      if (camera.current) {
        const photo = await camera.current.takePhoto();
        console.log('photo---', photo.path);
        setMedia(prevMedia => [{ type: 'photo', uri: photo.path }, ...prevMedia]);
        setOpenCamera(false); // Close camera after taking photo
      }
    } catch (error) {
      console.error('Failed to take photo:', error);
    }
  };

  const startRecording = async () => {
    try {
      if (camera.current) {
        setIsRecording(true);
        camera.current.startRecording({
          onRecordingFinished: (video) => {
            console.log('video---', video.path);
            setMedia(prevMedia => [{ type: 'video', uri: video.path }, ...prevMedia]);
            setIsRecording(false);
            setOpenCamera(false); // Close camera after recording video
          },
          onRecordingError: (error) => {
            console.error('Recording error:', error);
            setIsRecording(false);
          },
        });
      }
    } catch (error) {
      console.error('Failed to start recording:', error);
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    try {
      if (camera.current) {
        await camera.current.stopRecording();
      }
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    const newMicrophonePermission = await Camera.requestMicrophonePermission();
    setOpenCamera(false);
    console.log('Camera permission:', newCameraPermission);
    console.log('Microphone permission:', newMicrophonePermission);
  };

  if (device == null) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.main}>
      {!openCamera && (
        <View style={{ flex: 1, marginTop: '30%' }}>
          <ScrollView>
            {media.map((item, index) => (
              <View key={index} style={styles.mediaContainer}>
                {item.type === 'photo' ? (
                  <Image
                    source={{ uri: 'file://' + item.uri }}
                    style={styles.image}
                  />
                ) : (
                  <Video
                    source={{ uri: 'file://' + item.uri }}
                    style={styles.video}
                    resizeMode="cover"
                    controls={true}
                  />
                )}
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.touch}
            onPress={() => setOpenCamera(true)}>
            <Text style={styles.text}>Take Photo/Video</Text>
          </TouchableOpacity>
        </View>
      )}
      {openCamera && (
        <>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            ref={camera}
            photo={true}
            video={true}
          />
          {!isRecording ? (
            <View style={styles.controls}>
              <TouchableOpacity
                style={styles.circleContainer}
                onPress={takePicture}>
                <Text style={styles.circleText}>Capture Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.circleContainer}
                onPress={startRecording}>
                <Text style={styles.circleText}>Start Video</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.recordingControls}>
              <TouchableOpacity
                style={styles.circleContainer}
                onPress={stopRecording}>
                <Text style={styles.circleText}>Stop Video</Text>
              </TouchableOpacity>
              <Text style={styles.timerText}>{recordingTime}s</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  touch: {
    marginHorizontal: '6%',
    paddingVertical: '4%',
    backgroundColor: Colors.button,
    borderRadius: 10,
    marginVertical: '6%',
  },
  text: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: textSize.FONT_SIZE_16,
    fontWeight: '500',
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  recordingControls: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#ff0037',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    color: Colors.white,
    fontSize: textSize.FONT_SIZE_16,
    textAlign: 'center',
  },
  mediaContainer: {
    marginVertical: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '90%',
    height: 200,
  },
  video: {
    width: '90%',
    height: 200,
  },
  timerText: {
    color: 'red',
    fontSize: textSize.FONT_SIZE_16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
