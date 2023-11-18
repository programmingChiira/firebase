import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs,
    addDoc, deleteDoc, doc
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

getDocs(colRef)
    .then((snapshot) => {
        let books = []
        snapshot.docs.forEach((doc) => {
            books.push({ ...doc.data(), id: doc.id })
        })
        console.log(books)
    })
    .catch(err => {
        console.log(err.message)
    })

const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
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