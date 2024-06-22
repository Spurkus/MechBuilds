import { db } from "@/firebase";
import { collection, setDoc, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UserProfileType } from "../context/Authentication";

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

export const uploadProfilePicture = async (file: File | null, userProfile: UserProfileType) => {
  if (!file) return userProfile.uid;
  const storage = getStorage();
  const storageRef = ref(storage, `profilePictures/${userProfile.uid}`);
  const snapshot = await uploadBytes(storageRef, file);
  const photoURL = await getDownloadURL(snapshot.ref);
  return photoURL;
};
