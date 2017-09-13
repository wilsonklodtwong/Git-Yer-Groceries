import firebase from 'firebase'

  var config = {
    apiKey: "AIzaSyDdoFqEXZ1pkoTaMgWllw21vhdmqq_0L4U",
    authDomain: "get-yer-groceries.firebaseapp.com",
    databaseURL: "https://get-yer-groceries.firebaseio.com",
    projectId: "get-yer-groceries",
    storageBucket: "get-yer-groceries.appspot.com",
    messagingSenderId: "774850631372"
  };
  firebase.initializeApp(config);

  export default firebase;