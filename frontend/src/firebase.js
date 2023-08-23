import {initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCLwJH5w8FdUBlG161_3dAmP0M7NzS1NoA",
    authDomain: "buynow-e2037.firebaseapp.com",
    projectId: "buynow-e2037",
    storageBucket: "buynow-e2037.appspot.com",
    messagingSenderId: "377859314086",
    appId: "1:377859314086:web:8b8a4d980a254dd8e6ff67",
    measurementId: "G-CE56YMSGC5"
};

console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "gs://buynow-e2037.appspot.com");

console.log(storage);

export default storage;