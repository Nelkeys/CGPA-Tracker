import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

// Your Firebase configuration (same as signup.js)
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

const signInForm = document.getElementById("login-form");

const signInUser = evt => {
    evt.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userRef = ref(db, `userAuthList/${user.uid}`);

            // Fetch additional user data from Firebase Realtime Database
            get(userRef)
                .then((snapshot) => {
                    const userData = snapshot.val();
                    if (userData) {
                        // Save user info in sessionStorage
                        localStorage.setItem("user-info", JSON.stringify({
                            email: user.email,
                            uid: user.uid,
                            firstname: userData.firstname,
                            lastname: userData.lastname
                        }));

                        console.log('User logged in:', user);

                        // Redirect to home page or dashboard
                        window.location.href = "/";
                    } else {
                        console.error('User data not found');
                        document.getElementById('error-message').textContent = 'User data not found';
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                    document.getElementById('error-message').textContent = error.message;
                });
        })
        .catch((error) => {
            console.error('Error logging in:', error);
            document.getElementById('error-message').textContent = error.message;
        });
}

signInForm.addEventListener('submit', signInUser);
