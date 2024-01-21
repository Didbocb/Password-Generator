import { db } from "../../firebaseConfig.js";
import { deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

export async function deleteToDoItem(userId, documentId) {
    try {
        // get reference to the document which holds the todo item we want to delete
        const password = doc(db, `password-list-${userId}`, documentId);

        // delete the doucment using the referance we declared before
        deleteDoc(password);
    } catch (error) {
        console.error("Error removing document: ", error);
    }
}