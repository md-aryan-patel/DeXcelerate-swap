import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  getDoc,
} from "firebase/firestore";

import { db } from "./firebase.js";

const pushPair = async (_token0, _name0, _token1, _name1, _pair) => {
  const data = {
    token0: _token0,
    name0: _name0,
    token1: _token1,
    name1: _name1,
    pair: _pair,
  };

  try {
    const collectionRef = collection(db, "AllPairs");
    const docRef = await addDoc(collectionRef, data);
    console.log("Data pushed successfully with ID: ", docRef.id);
  } catch (error) {
    console.error("Error pushing data: ", error);
  }
  await addUniqueTokens(_token0, _name0, _token1, _name1);
};

const addUniqueTokens = async (token0, name0, token1, name1) => {
  try {
    const tokenRef = collection(db, "tokens");

    const q1 = query(tokenRef, where("tokenId", "==", token0));
    const snapshot1 = await getDocs(q1);
    const token0Exists = !snapshot1.empty;

    const q2 = query(tokenRef, where("tokenId", "==", token1));
    const snapshot2 = await getDocs(q2);
    const token1Exists = !snapshot2.empty;

    if (!token0Exists) {
      await addDoc(tokenRef, { tokenId: token0, name: name0 });
    }

    if (!token1Exists) {
      await addDoc(tokenRef, { tokenId: token1, name: name1 });
    }
  } catch (error) {
    console.error("Error adding unique tokens: ", error);
  }
};

const fetchAllPairs = async () => {
  try {
    const pairs = [];
    const collectionRef = collection(db, "AllPairs");
    const querySnapshot = await getDocs(collectionRef);
    querySnapshot.forEach((doc) => {
      pairs.push(doc.data());
    });
    return pairs;
  } catch (err) {
    console.error(err);
  }
};

const fetchData = async () => {
  try {
    const collectionRef = collection(db, "tokens");
    const querySnapshot = await getDocs(collectionRef);
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.id, " => ", doc.data());
    // });
    const data = await querySnapshot.data();
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export default { pushPair, fetchData, fetchAllPairs };
