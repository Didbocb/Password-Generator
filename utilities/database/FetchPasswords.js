import { db } from "../../firebaseConfig.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

export async function fetchAllToDoItems(userId) {
    try {
        const passwordCollection = collection(db, `password-list-${userId}`);

        // get all the documents in the user specified collection
        const querySnapshot = await getDocs(passwordCollection);

        // extract the data from each document and and return the data from each document
        const passwords = querySnapshot.docs.map((doc) => doc.data());

        return passwords;
    } catch (error) {
        console.error("Error Fetching data:", error);
        throw new Error("Failed to fetch all passwords in collection");
    }
}