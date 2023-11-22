import { Alert } from "react-native";
import { db, storage } from "../../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const handleApiError = (error, customErrorMessage) => {
  console.log("API Error:", error);
  const errorMessage =
    customErrorMessage || "An error occurred. Please try again later.";
  Alert.alert("Error", errorMessage);
};

// Function to get documents from a collection
export const getDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = [];

    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    return documents;
  } catch (error) {
    handleApiError(error, "Failed to fetch documents.");
    throw error; // Propagate the error to the calling component
  }
};

// Function to add a document to a collection
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    handleApiError(error, "Failed to add document.");
    throw error;
  }
};

// Function to set a document in a collection
export const setDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, data);
  } catch (error) {
    handleApiError(error, "Failed to set document.");
    throw error;
  }
};

// Function to update a document in a collection
export const updateDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
  } catch (error) {
    handleApiError(error, "Failed to update document.");
    throw error;
  }
};

// Function to delete a document from a collection
export const deleteDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  } catch (error) {
    handleApiError(error, "Failed to delete document.");
    throw error;
  }
};

// Function to get real-time snapshot of a document
export const subscribeToDocumentSnapshot = (
  collectionName,
  docId,
  callback
) => {
  try {
    const docRef = doc(db, collectionName, docId);

    // Subscribe to changes in the document
    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        callback(data);
      } else {
        // Document does not exist
        callback(null);
      }
    });

    // Return the unsubscribe function in case you want to stop listening later
    return unsubscribe;
  } catch (error) {
    handleApiError(error, "Failed to subscribe to document snapshot.");
    throw error;
  }
};

export const uploadImage = async (userId, imageUri) => {
  try {
    const storageRef = ref(Storage, `user_image/${userId}`);
    const response = await uploadBytes(storageRef, imageUri, {
      contentType: "image/jpeg",
    });
    return response;
  } catch (error) {
    handleApiError(error, "Failed to upload image.");
    throw error;
  }
};

// Function to get the download URL of an uploaded image
export const getImageDownloadURL = async (userId) => {
  try {
    const storageRef = ref(storage, `user_image/${userId}`);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    handleApiError(error, "Failed to get image download URL.");
    throw error;
  }
};
