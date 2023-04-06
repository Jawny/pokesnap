import { auth, storage } from "../providers/FirebaseProviders/FirebaseSetup";

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const handleSavePhoto = async (
  photo: Blob,
  pokemonSubfolder: string
) => {
  try {
    // Get the current user's UID
    const userId = auth.currentUser?.uid;

    if (userId == null) {
      throw new Error("user id is null.");
    }

    // Create a storage reference for the user's UID folder
    const userFolderRef = storage.ref().child(userId);

    // Create a storage reference for the subfolder under the user's UID folder
    const subfolderRef = userFolderRef.child(pokemonSubfolder);

    // Generate a timestamp for the photo's name
    const timestamp = new Date().getTime();

    // Create a storage reference for the photo with the timestamp as the name
    const photoRef = subfolderRef.child(
      `${pokemonSubfolder}-${timestamp.toString()}`
    );

    // Set the custom metadata
    const metadata = {
      customMetadata: {
        pokemon: pokemonSubfolder,
        timestamp: timestamp.toString(),
      },
    };

    // Upload the photo to Firebase Cloud Storage with the custom metadata
    await photoRef.put(photo, metadata);

    console.log("Photo saved to Firebase Cloud Storage successfully.");
  } catch (error) {
    console.error("Error saving photo to Firebase Cloud Storage: ", error);
  }
};

export interface IPhoto {
  name: string;
  url: string;
}

export const fetchImagesFromStorage = async (
  pokemonName: string
): Promise<IPhoto[]> => {
  try {
    const userId = auth.currentUser?.uid;

    if (userId == null) {
      throw new Error("user id is null.");
    }

    // Create a storage reference for the user's UID folder
    const userFolderRef = storage.ref().child(userId);

    // Create a storage reference for the pokemon folder under the user's UID folder
    const pokemonFolderRef = userFolderRef.child(pokemonName);

    // Get a list of all images in the pokemon folder
    const listResult = await pokemonFolderRef.listAll();

    // Map the list of images to an array of objects with the photo name and URL
    const photos: IPhoto[] = await Promise.all(
      listResult.items.map(async (item) => {
        const url = await item.getDownloadURL();
        return { name: item.name, url };
      })
    );

    return photos;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deletePhotoFromStorage = async (
  pokemonName: string,
  fileName: string
) => {
  try {
    const userId = auth.currentUser?.uid;

    if (userId == null) {
      throw new Error("user id is null.");
    }
    const folderRef = storage.ref().child(`${userId}/${pokemonName}`);
    const folderSnapshot = await folderRef.listAll();

    const fileRef = folderSnapshot.items.find((item) => item.name === fileName);

    if (!fileRef) {
      console.log(`File ${fileName} not found in folder ${pokemonName}`);
      return;
    }

    await fileRef.delete();
  } catch (error) {
    console.error(error);
  }
};
