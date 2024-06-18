import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getDatabase , ref, set } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAxH4HZiwY8uxmw8jVVePWPU1xHLPopJng",
    authDomain: "gp-tracks-f9718.firebaseapp.com",
    projectId: "gp-tracks-f9718",
    storageBucket: "gp-tracks-f9718.appspot.com",
    messagingSenderId: "231863288376",
    appId: "1:231863288376:web:023d6ad3ce36d041b11ccd",
    measurementId: "G-6CNRETM31G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);


let firstName = document.getElementById("first_name");
let lastName = document.getElementById("last_name");
let Email = document.getElementById("email");
let Password = document.getElementById("password");
let signUpForm = document.getElementById("signUpForm");



let RegisterUser = evt => {
    evt.preventDefault();

    createUserWithEmailAndPassword(auth, Email.value, Password.value)
    .then((userCredential) => {

        console.log(userCredential);
        set(ref(db,'userAuthList/' + userCredential.user.uid),{
            firstname : firstName.value,
            lastname : lastName.value
        })
        .then(() => {
            window.location.href = "login.html"; 
        })
        .catch((error) => {
            console.error("Error updating database:", error);
            document.getElementById('error-message').textContent = error.message;
        });
    })
    .catch((error) => {
        alert(error.message);
        console.log(error.code);
    });
}






signUpForm.addEventListener('submit', RegisterUser);

