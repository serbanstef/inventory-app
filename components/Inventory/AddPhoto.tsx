import { useState, useEffect } from "react";
import { StyleSheet, Pressable, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { CircularText } from "../StyledText";
import Camera from "../Camera";

export interface AddPhotoProps {
  onPhotoSelection: (uri: string | null) => void;
}

export default function AddPhoto({ onPhotoSelection }: AddPhotoProps) {
  const [showCamera, setShowCamera] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const handleAddPhotoPress = () => setShowCamera(true);

  const handleCameraClose = () => setShowCamera(false);

  const handleNewPhoto = (uri: string) => {
    setShowCamera(false);
    setPhotoUri(uri);
    onPhotoSelection(uri);
  };

  const handleDeletePhoto = () => {
    setPhotoUri(null);
    onPhotoSelection(null);
    // also delete photo from local storage
  };

  return (
    <>
      <Pressable style={styles.container} onPress={handleAddPhotoPress}>
        {photoUri ? (
          <>
            <Image source={{ uri: photoUri }} style={styles.itemImage} />
            <Pressable
              style={styles.deleteButtonContainer}
              pressRetentionOffset={10}
              hitSlop={10}
              onPress={handleDeletePhoto}
            >
              <Image
                source={require("../../assets/images/bin-icon.png")}
                style={styles.deleteButton}
              />
            </Pressable>
          </>
        ) : (
          <>
            <Entypo name="camera" size={44} color="#2D50E6" />
            <CircularText
              style={{ fontSize: 17, lineHeight: 24, marginTop: 5 }}
            >
              Add photo
            </CircularText>
          </>
        )}
      </Pressable>
      <Camera
        visible={showCamera}
        onCancel={handleCameraClose}
        onPhotoTaken={handleNewPhoto}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 140,
    borderRadius: 75,
    backgroundColor: "transparent",
    alignSelf: "center",
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(192, 190, 184, 0.3)",
    borderStyle: "dashed",
  },
  itemImage: { width: 140, height: 140, borderRadius: 70 },
  cameraContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    width: "100%",
    height: "50%",
  },
  deleteButton: {
    width: 12,
    height: 15,
  },
  deleteButtonContainer: {
    position: "absolute",
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#D95762",
    alignItems: "center",
    justifyContent: "center",
    right: 0,
    bottom: 0,
  },
});
