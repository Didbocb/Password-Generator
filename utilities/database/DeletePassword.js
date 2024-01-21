import { db } from "../../firebaseConfig.js";
import { deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

export async function deletePassword(userId, documentId) {
    try {
        // get reference to the document which holds the password we want to delete
        const passwordDocRef = doc(db, `password-list-${userId}`, documentId);

        // delete the doucment using the referance we declared before
        deleteDoc(passwordDocRef);
    } catch (error) {
        console.error("Error removing document: ", error);
    }
}