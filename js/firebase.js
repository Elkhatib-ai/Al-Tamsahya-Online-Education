// js/firebase.js

(function () {
  // 🔥 Firebase Config
  const firebaseConfig = {
    apiKey: "AIzaSyDRAwI-FZxQyD_KRPcdtLhAVbjgwLSZ9xU",
    authDomain: "ai-tamsahya-online-education.firebaseapp.com",
    projectId: "ai-tamsahya-online-education",
    storageBucket: "ai-tamsahya-online-education.firebasestorage.app",
    messagingSenderId: "853000263503",
    appId: "1:853000263503:web:5c6406ac42c8dcffbb573a"
  };

  // ✅ Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // ✅ Firestore
  const db = firebase.firestore();

  // ✅ Make tools globally available (this fixes window.firestoreTools undefined)
  window.firestoreTools = {
    db,
    collection: (name) => db.collection(name),
    doc: (path) => db.doc(path),
    getDoc: (ref) => ref.get(),
    setDoc: (ref, data) => ref.set(data),
    updateDoc: (ref, data) => ref.update(data),
    query: (ref) => ref, // (بسيطة)
    where: (...args) => firebase.firestore.FieldPath ? null : null,
  };

  console.log("🔥 Firebase Initialized Successfully");
})();
