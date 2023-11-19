import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCJx5Dlb0fGTBVkSoQ2agfrSsSof8XU45g",
    authDomain: "fir-project-81767.firebaseapp.com",
    projectId: "fir-project-81767",
    storageBucket: "fir-project-81767.appspot.com",
    messagingSenderId: "842070026528",
    appId: "1:842070026528:web:d7674a26b48c0a9ae7cf45"
};

initializeApp(firebaseConfig)

const db = getFirestore()

const colRef = collection(db, 'books')

const q = query(colRef, orderBy("createdAt"))

onSnapshot(q, (snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
})

const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp()
    })
        .then(() => {
            addBookForm.reset()
        })
})

const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', deleteBookForm.id.value)

    deleteDoc(docRef)
        .then(() => {
            deleteBookForm.reset()
        })
})