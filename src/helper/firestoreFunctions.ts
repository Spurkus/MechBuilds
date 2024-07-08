import { db } from "@/firebase";
import { collection, setDoc, doc, updateDoc, query, where, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UserProfileType, EditUserProfileType } from "@/src/types/user";
import { KeyboardType } from "@/src/types/keyboard";
import { ModalThemeType } from "../types/globalModal";

export const createUserProfile = async (
  userProfile: UserProfileType,
): Promise<{ title: string; message: string; theme: ModalThemeType }> => {
  const userProfilesCollectionRef = collection(db, "userProfiles");

  return await setDoc(doc(userProfilesCollectionRef, userProfile.uid), userProfile).then(() => {
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

export const isKeyboardNameTaken = async (uid: string, keyboardName: string): Promise<boolean> => {
  const keyboardsCollectionRef = collection(db, "keyboards");
  const q = query(
    keyboardsCollectionRef,
    where("uid", "==", uid),
    where("name", "==", keyboardName),
  );
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty; // Returns true if the keyboard name is taken, false otherwise
};

export const uploadKeyboardContent = async (file: File, keyboardId: string) => {
  const storage = getStorage();
  const storageRef = ref(storage, `keyboardContent/${keyboardId}`);
  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
};

export const createKeyboard = async (
  keyboard: KeyboardType,
): Promise<{ title: string; message: string; theme: ModalThemeType }> => {
  const keyboardsCollectionRef = collection(db, "keyboards");

  return await setDoc(doc(keyboardsCollectionRef, keyboard.id), keyboard).then(() => {
    return {
      title: "Success",
      message: "Keyboard created successfully",
      theme: "success",
    };
  });
};

export const getAllKeyboardsFromUser = async (uid: string): Promise<KeyboardType[]> => {
  const keyboardsCollectionRef = collection(db, "keyboards");
  const q = query(keyboardsCollectionRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data() as KeyboardType);
};
