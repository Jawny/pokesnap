import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { Text, IconButton, MD3Colors } from "react-native-paper";
import * as tf from "@tensorflow/tfjs";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Background, Button, Paragraph, Header, Logo } from "components";
import {
  loadModel,
  transformImageToTensor,
  makePredictions,
} from "core/tensorflow";
import { theme } from "core";

const CameraButton = ({ navigation }: any) => {
  const cameraRef = React.useRef(null);
  const [showCamera, setShowCamera] = React.useState(false);
  const [hasCameraPermission, setHasCameraPermission] = React.useState(false);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    React.useState(false);
  const [photo, setPhoto] = React.useState();

  React.useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  const takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    const newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  //   const getPredictions = async (image: any) => {
  //     await tf.ready();
  //     const model = (await loadModel()) as tf.LayersModel;
  //     const tensor_image = await transformImageToTensor(image);
  //     const predictions = await makePredictions(1, model, tensor_image);
  //   };

  return (
    <View style={styles.container}>
      {!showCamera ? (
        <IconButton
          style={styles.button}
          icon="camera"
          iconColor={theme.colors.primary}
          containerColor={theme.colors.secondary}
          mode="contained"
          size={50}
          onPress={() => {
            setShowCamera(true);
          }}
        />
      ) : (
        <Camera style={styles.container} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <Button title="Take Pic" onPress={takePic} />
          </View>
        </Camera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginVertical: 10,
    paddingVertical: 2,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
});

export default CameraButton;
