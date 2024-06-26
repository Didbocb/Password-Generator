import { auth } from "./firebaseConfig.js";

// import utility functions (to make it easier for us to write code in main)
import { storePassword } from "./utilities/database/StorePassword.js";
import { fetchAllPasswords } from "./utilities/database/FetchPasswords.js";
import { deletePassword } from "./utilities/database/DeletePassword.js";

/*
  HANDLES USER AUTHENTICATION FOR index.html PAGE
*/
document.addEventListener("DOMContentLoaded", () => {
  // check if the user is signed in
  auth.onAuthStateChanged((user) => {
    // if the user is signed in load their todo list
    if (user) {
      const userId = auth.currentUser.uid;
      fetchAndDisplayAllPasswords(userId);
      console.log("User is authenticated - index.html");
    }
    // if not re-route them to the signin page
    else {
      window.location.href = "signIn.html";
    }
  });
});

/*
    HANDLES DISPLAYING ALL PASSWORD ITEMS ON THE WEBSITE (used in fetchAndDisplayAllToDoItems)
*/
function displayPasswords(userId, passwords) {
  /*
      Iterates through all the todoItems and display them on the UI.
      todoItems are passed into this fucntion.

      don't spend to much time worrying what this function's purpose is.
      All you need to know is that it handles displaying the data the user creates and stores.
      The main focus of this workshop is Firebase and how we can use the database and authentication
  */

  // get the HTML element that will contain the todo items
  const passwordsContainer = document.querySelector(".passwords");
  passwordsContainer.innerHTML = ""; // clear/empty the items container

  // iterate through all todo items, creating a UI component for each item
  passwords.forEach((element) => {
    // creates the main <div> that holds the todo item
    let newPassword = null;
    const itemDiv = document.createElement("div");
    itemDiv.className = "password";

    // creates a <div> for the bullet
    const bulletDiv = document.createElement("div");
    bulletDiv.className = "bullet";

    // creates the <div> that holds the text for the todo item
    const passwordName = document.createElement("div");
    passwordName.className = "password-name";
    passwordName.textContent = element.passwordText; // Assign the correct value to the textContent property

    // creates a <div> for the bullet
    const bulletDiv2 = document.createElement("div");
    bulletDiv2.className = "bullet";

    window.addEventListener('passwordGenerated', (event) => {
      // The generated password is in event.detail
      newPassword = event.detail;
    });
    newPassword = document.createElement("div");
    newPassword.className = "password-code";
    newPassword.textContent = element.passwordCode;

    // creates the remove button for the todo item
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "removeBtn";

    // functionality for the remove button
    removeButton.onclick = () => {
      deletePassword(userId, element.uid); // handles deleting the list item document in the database
      fetchAndDisplayAllPasswords(userId); // re-fetch the data and update UI since we deleted a list item
    };

    // inside the displayPasswords function

    // creates a <div> to hold the password name
    const passwordNameDiv = document.createElement("div");
    passwordNameDiv.className = "password-name";
    passwordNameDiv.textContent = element.passwordText; // Assign the correct value to the textContent property

    // creates a <div> to hold the "Show Password" button and the password text
    const passwordContentDiv = document.createElement("div");
    passwordContentDiv.className = "password-content";

    // creates a <button> for toggling password visibility
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Show Password";
    toggleButton.className = "toggleBtn";

    // creates a <div> to hold the password text
    const passwordTextDiv = document.createElement("div");
    passwordTextDiv.className = "password-text";
    passwordTextDiv.style.display = "none"; // Initially hide the password text

    // creates a hidden input field to store the actual password
    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.value = element.passwordCode;

    // functionality for the toggle button
    toggleButton.onclick = () => {
      if (passwordTextDiv.style.display === "none") {
        passwordTextDiv.textContent = hiddenInput.value; // Set the password text
        passwordTextDiv.style.display = "block"; // Show the password text
        toggleButton.textContent = "Hide Password";
      } else {
        passwordTextDiv.textContent = ""; // Clear the password text
        passwordTextDiv.style.display = "none"; // Hide the password text
        toggleButton.textContent = "Show Password";
      }
    };

    // appends the toggle button and password text to the password content <div>
    passwordContentDiv.appendChild(toggleButton);
    passwordContentDiv.appendChild(passwordTextDiv);

    // appends the password name, password content, and remove button to the todo item <div>
    itemDiv.appendChild(bulletDiv);
    itemDiv.appendChild(passwordNameDiv);
    itemDiv.appendChild(passwordContentDiv);
    itemDiv.appendChild(removeButton);


    // append the todo item <div> to the container that holds all the todo items
    passwordsContainer.appendChild(itemDiv);
  });
}

/*
  HANDLES FETCHING ALL TODO ITEMS FOR THE DATABASE AND DISPLAYING THEM ON THE WEBSITE
*/
function fetchAndDisplayAllPasswords(userId) {
  /*
    Calls the fetchAllToDoItems API that gets all the todoItems. 
    Then we display the todo items after the request is completed. (the .then() )
    We also catch any errors that may occur in the request
  */

  fetchAllPasswords(userId) // we call our method that fetches from our database
    .then((passwords) => {
      // .then() means we're waiting for the request to finish, then we can proceed with the below logic...

      console.log("Raw Data from fetchAllPasswords shown below");
      console.log(passwords); // to see the raw data that is fetched, open the console with Inspect Element

      // call a helper function to loop through all the documents fetched from
      // our database and display them on the frontend
      displayPasswords(userId, passwords);
    })
    .catch((error) => {
      // catch any erros and print them to the console
      console.error("Error fetching data:", error);
    });
}

/*
  HANDLES ADDING ITEM TO TODO LIST
*/
function handlePasswordAdd() {
  /*
    Invoked when the user clicks the 'Add' button.
    This function handles all logic when the user adds a todo item 
      (generates unique id, stores data in database, re-fetches todo items)
  */

  // get user input from input field
  const textInput = document.getElementById("password-input");
  const passwordName = textInput.value.trim(); // removes any extra white space
  const passwordCode = document.getElementById("password").value.trim();

  // validate input exists
  if (passwordName === "") {
    console.log("No passwords entered");
    return;
  }

  /*
    Try adding a new item to your to do list and uncomment the console.log below.
    Then naviagate to your browser and Inspect Element, go to the console and you should see
    all the information firebase has, for the current user that's logged in
  */

  console.log(auth.currentUser);

  // get userId (this is auto generated by firebase when the user signs up)
  const userId = auth.currentUser.uid;
  // get email (this is auto stored by firebase when the user is logged in)
  const userEmail = auth.currentUser.email;

  /* STEP 4: Call function storeToDoItem which is located in file 'StoreToDoItem' and pass in the following 
  parameters:
  1) userID
  2) userEmail 
  3) todoItemText*/
  storePassword(userId, userEmail, passwordName, passwordCode);

  // clear the input value after storing the data
  textInput.value = "";

  /*
    Fetch and display all items in the todo list.
    Since the user just added a new item we must display it, and so we re-fetch all the items (documents)
    in the user's todo list collection
  */

  /* STEP 7: Call function fetchAndDisplayAllToDoItems which is located in file 'main.js' and pass in the following 
  parameters:
  1) userID 
  */
  fetchAndDisplayAllPasswords(userId);
}

document.getElementById("new-password-btn").addEventListener("click", handlePasswordAdd);