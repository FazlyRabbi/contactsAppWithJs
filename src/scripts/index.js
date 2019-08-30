//importing  style form css module
// import './styles/main.css';
//importing http module
import { http } from "./http";
//importing ui module
import { ui } from "./ui.js";

//getting contacts after DOM beign loaded...
document.addEventListener("DOMContentLoaded", getContacts);

//submit contacs
document
  .getElementById("contuctSubmit")
  .addEventListener("click", submitContact);
//deleting contacs
document.getElementById("contacts").addEventListener("click", deleteContacts);
//updating contacs
document.getElementById("contacts").addEventListener("click", updateIcon);
//adding event on the back button
document.getElementById("contactsForm").addEventListener("click", backButton);

function submitContact(e) {
  //preventing Browser reloading after form submit
  e.preventDefault();
  //Getting value of form field
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phoneNumber").value;
  const id = document.getElementById("contacsId").value;
  //checking Form validation
  if (firstName === "" || lastName === "" || email === "" || phone === "") {
    //Showing message to UI
    ui.showMassege("plz enter nessary item", "alert-danger");
  } else {
    //constructing data object from form field value
    const data = {
      firstName,
      lastName,
      email,
      phone
    };

    if (id === "") {
      //sending data to the server
      http.post("http://localhost:3000/contacts", data).then(() => {
        //showing message
        ui.showMassege("your item has been added!", "alert-success");
        ui.clearField();
        //Getting contacts
        getContacts();
      });
    } else {
      //updating contacts in the server
      http.update(`http://localhost:3000/contacts/${id}`, data).then(() => {
        //showing message
        ui.clearField();
        ui.changeState("add");
        ui.showMassege("Your information has been updated!", "alert-success");
        //Getting contacts
        getContacts();
      });
      //sending data to the server
    }
  }
}

function deleteContacts(e) {
  if (e.target.parentElement.id === "delete") {
    ui.clearField();
    const id = e.target.parentElement.dataset.id;
    http
      .delete(`http://localhost:3000/contacts/${id}`)
      .then(() => {
        ui.showMassege("Your information has been deleted!", "alert-danger");
        getContacts();
      })
      .then(() => {
        ui.showMassege("contac can't deleted", "alert-info");
      });
  }
}

function updateIcon(e) {
  if (e.target.parentElement.id === "edit") {
    const id = e.target.parentElement.dataset.id;
    http
      .get(`http://localhost:3000/contacts/${id}`)
      .then(data => {
        ui.updateField(data);
        ui.cancelBtn();
        ui.btnHandle();
      })
      .then(err => {
        ui.showMassege("contac can't updated", "alert-info");
      });
  }
}

function backButton(e) {
  if (e.target.id === "cencel") {
    ui.changeState("add");
    ui.clearField();
  }
  e.preventDefault();
}

//getting contacs forme server
function getContacts() {
  http
    .get("http://localhost:3000/contacts")
    .then(contacts => {
      ui.paint(contacts);
    })
    .catch(() => {
      ui.showMassege("problem is getting contacs", "alert-danger");
    });
}
