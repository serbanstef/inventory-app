import { useState, useEffect, useRef } from "react";
import { StyleSheet, Pressable, Modal } from "react-native";

import { Camera as ExpoCamera } from "expo-camera";
import * as FileSystem from "expo-file-system";

import { View } from "./Themed";
import { CircularText } from "./StyledText";

export interface CameraProps {
  visible: boolean;
  onCancel: () => void;
  onPhotoTaken: (uri: string) => void;
}

export default function Camera({
  visible,
  onCancel,
  onPhotoTaken,
}: CameraProps) {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isReady, setIsReady] = useState(false);
  const cameraRef = useRef<ExpoCamera>(null);

  useEffect(() => {
    if (visible) handlePermissions();
  }, [visible]);

  const handlePermissions = async () => {
    const { status } = await ExpoCamera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const handleTakePicture = async () => {
    try {
      if (!isReady) throw new Error("Camera not ready!");

      const photo = await cameraRef.current?.takePictureAsync();

      if (!photo?.uri || !FileSystem.documentDirectory) {
        throw new Error("Photo or storage error!");
      }

      const newUri =
        FileSystem.documentDirectory +
        photo?.uri.split("/")[photo.uri.split("/").length - 1];

      // temp photo needs to be copied to a permanent place
      await FileSystem.copyAsync({ from: photo?.uri, to: newUri });

      onPhotoTaken(newUri);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal visible={visible} onRequestClose={onCancel}>
      <View style={styles.cameraContainer}>
        {hasPermission ? (
          <ExpoCamera
            style={styles.camera}
            type={ExpoCamera.Constants.Type.back}
            onCameraReady={() => setIsReady(true)}
            ref={cameraRef}
          />
        ) : (
          <View style={styles.camera} />
        )}
        <View style={styles.buttonsContainer}>
          <Pressable
            onPress={handleTakePicture}
            style={({ pressed }) => [{ opacity: pressed ? 0.3 : 1 }]}
          >
            <View style={styles.outerCircle} />
            <View style={styles.innerCircle} />
          </Pressable>
          <Pressable
            style={styles.cancelContainer}
            onPress={onCancel}
            hitSlop={20}
          >
            <CircularText style={styles.cancelText}>Cancel</CircularText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: "35%",
  },
  camera: {
    flex: 1,
    backgroundColor: "black",
  },
  buttonsContainer: {
    width: "100%",
    height: 150,
    backgroundColor: "transparent",
    alignItems: "center",
    paddingTop: 20,
  },
  outerCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "white",
  },
  innerCircle: {
    position: "absolute",
    width: 64,
    height: 64,
    borderRadius: 31,
    top: 4,
    left: 4,
    borderWidth: 2,
    borderColor: "black",
  },
  cancelContainer: {
    position: "absolute",
    left: 20,
    top: 44,
  },
  cancelText: {
    color: "white",
    fontSize: 17,
    lineHeight: 24,
  },
});
