import { db } from "@/firebase";
import {
  collection,
  setDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { UserProfileType, EditUserProfileType } from "@/src/types/user";
import { KeyboardType } from "@/src/types/keyboard";
import { ModalThemeType } from "@/src/types/globalModal";

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

export const getUser = async (username: string): Promise<UserProfileType | null> => {
  if (typeof username === "undefined" || username === "") return null;
  const userProfilesCollectionRef = collection(db, "userProfiles");
  const q = query(userProfilesCollectionRef, where("username", "==", username.toLowerCase()));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) return null;
  return querySnapshot.docs[0].data() as UserProfileType;
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
  // Name cannot be pages
  if (["", "explore", "about", "profile", "settings"].includes(keyboardName)) return false;

  // Check if name is taken
  const keyboardsCollectionRef = collection(db, "keyboards");
  const q = query(keyboardsCollectionRef, where("uid", "==", uid), where("name", "==", keyboardName));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty; // Returns true if the keyboard name is taken, false otherwise
};

export const uploadKeyboardContent = async (file: File, keyboardID: string) => {
  const storage = getStorage();
  const storageRef = ref(storage, `keyboardContent/${keyboardID}`);
  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
};

export const deleteKeyboardContent = async (mediaID: string) => {
  const storage = getStorage();
  const storageRef = ref(storage, `keyboardContent/${mediaID}`);
  await deleteObject(storageRef);
};

export const handleUploadKeyboardContent = async (mediaList: (File | string)[], keyboardID: string) => {
  const mediaURLList = await Promise.all(
    mediaList.map(async (media) => {
      if (media instanceof File) {
        return await uploadKeyboardContent(media, `${keyboardID}_${mediaList.indexOf(media)}`);
      }
      return media;
    }),
  );
  return mediaURLList;
};

export const createKeyboard = async (keyboard: KeyboardType) => {
  const keyboardsCollectionRef = collection(db, "keyboards");
  const newKeyboardRef = doc(keyboardsCollectionRef);
  await setDoc(newKeyboardRef, keyboard);
  return newKeyboardRef.id;
};

export const editKeyboard = async (keyboardID: string, fieldsToUpdate: Partial<KeyboardType>) => {
  const keyboardsCollectionRef = collection(db, "keyboards");
  await updateDoc(doc(keyboardsCollectionRef, keyboardID), fieldsToUpdate);
};

export const getAllKeyboardsFromUser = async (uid: string, view: boolean = false): Promise<KeyboardType[]> => {
  const keyboardsCollectionRef = collection(db, "keyboards");
  let q = query(
    keyboardsCollectionRef,
    where("uid", "==", uid),
    where("visible", "==", true),
    orderBy("createdAt", "desc"),
  );
  if (view) q = query(q, where("status", "==", "public"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data() as KeyboardType);
};

export const getKeyboardForKeyboardPage = async (
  userID: string,
  keyboardName: string,
  userIsOwner: boolean,
): Promise<KeyboardType | null> => {
  const keyboardsCollectionRef = collection(db, "keyboards");
  let q = query(
    keyboardsCollectionRef,
    where("uid", "==", userID),
    where("name", "==", keyboardName),
    where("visible", "==", true),
  );
  if (!userIsOwner) q = query(q, where("status", "!=", "private"));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) return null;
  return querySnapshot.docs[0].data() as KeyboardType;
};

export const deleteKeyboard = async (keyboardID: string, mediaNumber: number) => {
  // Delete keyboard
  const keyboardsCollectionRef = collection(db, "keyboards");
  await deleteDoc(doc(keyboardsCollectionRef, keyboardID));

  // Delete keyboard media
  const storage = getStorage();
  for (let i = 0; i < mediaNumber; i++) {
    await deleteKeyboardContent(`${keyboardID}_${i}`);
  }
};

export const deleteUser = async (uid: string) => {
  const userProfilesCollectionRef = collection(db, "userProfiles");
  const q = query(userProfilesCollectionRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) await deleteDoc(querySnapshot.docs[0].ref);
};

export const deleteUserAndUserKeyboard = async (uid: string) => {
  await deleteUser(uid); // Delete user profile

  // Delete user keyboards
  const keyboardsCollectionRef = collection(db, "keyboards");
  const keyboardQuery = query(keyboardsCollectionRef, where("uid", "==", uid));
  const keyboardQuerySnapshot = await getDocs(keyboardQuery);
  keyboardQuerySnapshot.docs.forEach(async (doc) => {
    await deleteKeyboard(doc.id, (doc.data() as KeyboardType).media.length);
  });
};

export const getUsernameFromUID = async (uid: string): Promise<string> => {
  const userProfilesCollectionRef = collection(db, "userProfiles");
  const q = query(userProfilesCollectionRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) return "";
  return querySnapshot.docs[0].data().username;
};

export const fetchKeyboardsWithPagination = async (
  lastVisible: QueryDocumentSnapshot | null,
  itemsPerPage: number,
): Promise<{
  keyboards: (KeyboardType & { username: string })[];
  lastVisible: QueryDocumentSnapshot | null;
  hasMore: boolean;
}> => {
  const keyboardsCollectionRef = collection(db, "keyboards");

  let q = query(
    keyboardsCollectionRef,
    orderBy("createdAt", "desc"),
    where("status", "==", "public"),
    limit(itemsPerPage),
  );
  if (lastVisible) q = query(q, startAfter(lastVisible));
  const querySnapshot = await getDocs(q);

  const keyboards = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const userID = doc.data().uid;
      const username = await getUsernameFromUID(userID);
      return { ...doc.data(), username } as KeyboardType & { username: string };
    }),
  );

  const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1] || null;
  return { keyboards, lastVisible: newLastVisible, hasMore: querySnapshot.size === itemsPerPage };
};
