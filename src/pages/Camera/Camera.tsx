import { useState, useEffect, useRef } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

function CameraComponent() {
  const [photo, setPhoto] = useState<string | null>(null);
  const cameraLoaded = useRef(false);

  const takePhoto = async () =>
    await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

  useEffect(() => {
    async function getPhoto() {
      if (!cameraLoaded.current) {
        cameraLoaded.current = true;
        const image = await takePhoto();
        setPhoto(image.webPath ?? null);
      }
    }
    getPhoto();
  }, []);

  return (
    <div>
      {photo ? (
        <>
          <img src={photo} alt="Captured Photo" />
          <button>retake Photo</button>
          <button>Analyze Pokemon</button>
        </>
      ) : (
        <p>Loading photo...</p>
      )}
    </div>
  );
}

export default CameraComponent;
