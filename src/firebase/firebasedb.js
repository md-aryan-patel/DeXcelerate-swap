import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

import { db } from "./firebase.js";

const pushPair = async (_token0, _token1, _pair) => {
  const data = {
    token0: _token0,
    token1: _token1,
    pair: _pair,
  };

  try {
    const collectionRef = collection(db, "AllPairs");
    const docRef = await addDoc(collectionRef, data);
    console.log("Data pushed successfully with ID: ", docRef.id);
  } catch (error) {
    console.error("Error pushing data: ", error);
  }
  await addUniqueTokens(_token0, _token1);
};

const addUniqueTokens = async (token1, token2) => {
  try {
    const tokenRef = collection(db, "tokens");

    const q1 = query(tokenRef, where("tokenId", "==", token1));

    const snapshot1 = await getDocs(q1);
    const token1Exists = !snapshot1.empty;

    const q2 = query(tokenRef, where("tokenId", "==", token2));

    const snapshot2 = await getDocs(q2);
    const token2Exists = !snapshot2.empty;

    if (!token1Exists) {
      await addDoc(tokenRef, { tokenId: token1 });
    }

    if (!token2Exists) {
      await addDoc(tokenRef, { tokenId: token2 });
    }
  } catch (error) {
    console.error("Error adding unique tokens: ", error);
  }
};

const fetchData = async () => {
  try {
    const collectionRef = collection(db, "tokens");
    const querySnapshot = await getDocs(collectionRef);
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.id, " => ", doc.data());
    // });
    const data = await querySnapshot.docs();
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export default { pushPair, fetchData };
