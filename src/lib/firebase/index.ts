// Import the functions you need from the SDKs you need
import { initializeApp, getApps, FirebaseOptions } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const db = getFirestore(app);

export async function addDeneme(text: string) {
  const denemeCol = collection(db, "deneme-2");

  await addDoc(denemeCol, {
    text,
    createdAt: serverTimestamp(),
  });
}

export async function getDenemes() {
  const denemeCol = collection(db, "deneme-2");
  const { docs } = await getDocs(
    query(denemeCol, orderBy("createdAt", "desc"))
  );

  const denemes: IDeneme[] = [];

  docs.forEach((doc) => {
    const data = doc.data();
    data.id = doc.id;
    data.createdAt = data.createdAt.toDate();

    denemes.push(data as IDeneme);
  });

  return denemes;
}

export async function deleteDeneme(id: string) {
  const denemeCol = collection(db, "deneme-2");

  await deleteDoc(doc(denemeCol, id));
}
