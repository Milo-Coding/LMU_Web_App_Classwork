// This service completely hides the data store from the rest of the app.
// No other part of the app knows how the data is stored. If anyone wants
// to read or write data, they have to go through this service.

import { db, auth } from '../firebaseConfig'
import { collection, query, getDocs, addDoc, orderBy, limit, startAfter, Timestamp, where } from 'firebase/firestore'

export async function createArticle({ title, body, category}) {
  const data = { 
    title, 
    body, 
    date: Timestamp.now(), 
    category, 
    authorId: auth.currentUser.displayName
  }
  const docRef = await addDoc(collection(db, 'articles'), data)
  return { id: docRef.id, ...data }
}

const PAGE_SIZE = 10

export async function fetchArticles(filters, lastVisible) {
  const snapshot = filters.length !== 0 && lastVisible
  ? await getDocs(query(collection(db, 'articles'), orderBy('date', 'desc'), where('category', 'in', filters), startAfter(lastVisible), limit(PAGE_SIZE)))
  : filters.length !== 0 ? await getDocs(query(collection(db, 'articles'), orderBy('date', 'desc'), where('category', 'in', filters), limit(PAGE_SIZE)))
  : lastVisible ? await getDocs(query(collection(db, 'articles'), orderBy('date', 'desc'), startAfter(lastVisible), limit(PAGE_SIZE)))
  : await getDocs(query(collection(db, 'articles'), orderBy('date', 'desc'), limit(PAGE_SIZE)))
   

  return snapshot.docs.map(doc => ({
    id: doc.id,
    originalDoc: doc,
    ...doc.data()
  }))
}
