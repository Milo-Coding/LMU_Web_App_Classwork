import { db } from "../firebaseConfig.js"
import { collection, query, getDocs, addDoc, orderBy, limit, Timestamp } from "firebase/firestore"

export async function createArticle({ prompt, result }) {
  const data = { prompt: prompt, content: result, date: Timestamp.now() }
  const docRef = await addDoc(collection(db, "articles"), data)
  return { id: docRef.id, ...data }
}

// TODO pagination.
export async function fetchArticles() {
  const snapshot = await getDocs(
    query(collection(db, "articles"), orderBy("date", "desc"), limit(10))
  )
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}