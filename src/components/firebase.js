import firebase from "firebase"

const firebaseConfig = {
        apiKey: "AIzaSyDHxK3huS7eA_CqRnU171t6XbXGVS7cXUM",
        authDomain: "library-project-4baae.firebaseapp.com",
        projectId: "library-project-4baae",
        storageBucket: "library-project-4baae.appspot.com",
        messagingSenderId: "39566738243",
        appId: "1:39566738243:web:ff74b6bff3e7728919e5f6"
      };
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const storage = firebase.storage();

export { db, storage }
