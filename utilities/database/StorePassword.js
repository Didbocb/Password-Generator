import { collection, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { db } from "../../firebaseConfig.js";

export async function storePassword(userId, userEmail, passwordText, passwordCode) {
    try {
        const userPasswordListCollection = collection(db, `password-list-${userId}`);

        // generate a unique id for the document and assemble our data into an object
        const docUniqueId = generateUniqueId();

        //STEP 6: Create a object called data that will hold the information going into the document 
        const data = {
            userId: userId,
            email: userEmail,
            passwordText: passwordText,
            passwordCode: passwordCode,
            uid: docUniqueId,
        };

        // store the following data in a document the specified user collection
        // userPasswordListCollection -> the collection we store into
        // docUniqueId -> the name of our document
        // data -> the data object the document will contain
        await setDoc(doc(userPasswordListCollection, docUniqueId), data);
    } catch (error) {
        console.error("Error storing data:", error);
        throw new Error("Failed to store item");
    }
}

// helper function for storePassword that generates a unique Id
// we need this so that we can get a referance each document
function generateUniqueId() {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 10000);
    const uniqueId = `${timestamp}_${randomNum}`;
    return uniqueId;
}