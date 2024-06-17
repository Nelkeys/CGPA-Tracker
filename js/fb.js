
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  const analytics = getAnalytics(app);
