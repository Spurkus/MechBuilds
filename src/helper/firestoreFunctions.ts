import { db } from "@/firebase";
import { collection, setDoc, doc, updateDoc, query, where, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UserProfileType, EditUserProfileType } from "@/src/types/user";

export const createUserProfile = async (userProfile: UserProfileType) => {
  const userProfilesCollectionRef = collection(db, "userProfiles");

  await setDoc(doc(userProfilesCollectionRef, userProfile.uid), userProfile).then(() => {
    return {
      title: "Success",
      message: "User profile created successfully",
      theme: "success",
    };
  });
};

export const updateUserProfile = async (userProfile: UserProfileType) => {
  const userProfilesCollectionRef = collection(db, "userProfiles");

  await setDoc(doc(userProfilesCollectionRef, userProfile.uid), userProfile);
};

export const editUserProfile = async (uid: string, fieldsToUpdate: EditUserProfileType) => {
  const userProfilesCollectionRef = collection(db, "userProfiles");

  await updateDoc(doc(userProfilesCollectionRef, uid), fieldsToUpdate as { [x: string]: any });
};

export const uploadProfilePicture = async (file: File | null, userProfile: UserProfileType) => {
  if (!file) return userProfile.profilePicture;
  const storage = getStorage();
  const storageRef = ref(storage, `profilePictures/${userProfile.uid}`);
  const snapshot = await uploadBytes(storageRef, file);
  const photoURL = await getDownloadURL(snapshot.ref);
  return photoURL;
};

export const isUsernameTaken = async (username: string): Promise<boolean> => {
  const userProfilesCollectionRef = collection(db, "userProfiles");
  const q = query(userProfilesCollectionRef, where("username", "==", username));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty; // Returns true if the username is taken, false otherwise
};

export const getDefaultProfilePictureURL = async () => {
  const storage = getStorage();
  const storageRef = ref(storage, "profilePictures/Default_Profile_Picture.png");
  return await getDownloadURL(storageRef);
};

export const getDefaultKeyboardImage = async () => {
  const storage = getStorage();
  const storageRef = ref(storage, "keyboardContent/Default_Keyboard_Image.png");
  return await getDownloadURL(storageRef);
};
