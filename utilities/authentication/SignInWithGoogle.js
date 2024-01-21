import { signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { auth } from "../../firebaseConfig.js";

// Function handles the users signin with their google account 
export async function signInUserWithGoogle () {
    const provider = new GoogleAuthProvider();

    try {
        await signInWithPopup(auth, provider);

        // return the string "success" if sign-in was complete
        return "success";
    
    // If there was an error when signing-in
    } catch (error) {
        console.error(error);
        return "error";
    }
};