import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    // Your firebase configuration
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

// Check auth state on page load
onAuthStateChanged(auth, (user) => {
    if (!user) {
        // No user is signed in, redirect to login
        window.location.href = "landing-page.html";
    }
});

// Log out function
window.handleLogout = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("User signed out.");
        window.location.href = "landing-page.html";
    }).catch((error) => {
        // An error happened.
        console.error("Error signing out:", error);
    });
}
