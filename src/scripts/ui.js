//main Ui class
class Ui {
  constructor() {
    this.contactInput = document.getElementById("contacts");
    this.firstName = document.getElementById("firstName");
    this.lastName = document.getElementById("lastName");
    this.email = document.getElementById("email");
    this.phoneNumber = document.getElementById("phoneNumber");
    this.updateBtn = document.getElementById("contuctSubmit");
    this.contacsForm = document.getElementById("contactsForm");
    this.formEnd = document.querySelector("#formEnd");
    this.contacsId = document.getElementById("contacsId");
    this.card = document.getElementById("card");
  }
  //paint mathod of Ui to print data in ui
  paint(contacts) {
    let output = "";
    contacts.forEach(contacts => {
      const { firstName, lastName, email, phone, id } = contacts;
      output += `<div class="card">
        <div class="card-body">
          <h5 class="card-title">${firstName} ${lastName}</h5>
          <p class="card-text">${email}</p>
          <p class="card-text">${phone}</p>
          <a href="#" id="delete" class="mr-2" data-id="${id}">
            <i class="far fa-trash-alt"></i>
          </a>  
          <a href="#" id="edit"  data-id="${id}">
          <i class="far fa-edit"></i>
        </a>  
        </div>
      </div>`;
    });
    this.contactInput.innerHTML = output;
  }
  updateField({ firstName, lastName, phone, email, id }) {
    this.firstName.value = firstName;
    this.lastName.value = lastName;
    this.phoneNumber.value = phone;
    this.email.value = email;
    this.contacsId.value = id;
  
  }
  btnHandle() {
    this.updateBtn.innerHTML = "Update Contacts";
    this.updateBtn.classList.remove("btn-primary");
    this.updateBtn.classList.add("btn-secondary");
    this.updateBtn.style.color = "#fff";
  }
  cancelBtn() {
    const btn = document.createElement("button");
    btn.classList = "btn btn-block btn-info";
    btn.id = "cencel";
    btn.textContent = "Back";
    //inserting cancel button bere the formEnd
    this.contacsForm.insertBefore(btn, this.formEnd);
  }
  clearField() {
    this.firstName.value = "";
    this.lastName.value = "";
    this.email.value = "";
    this.phoneNumber.value = "";
  }
  changeState(state) {
    if (state === "add") {
      if (document.getElementById("cencel")) {
        document.querySelector("#cencel").remove();
      }

      this.updateBtn.classList.remove("btn-secondary");
      this.updateBtn.classList.add("btn-primary");
      this.updateBtn.innerHTML = "Submit Contuct";
      this.contacsId.value = "";
    } else {
    }
  }
  showMassege(msgText, className) {
    const msg = `<div class="alert ${className}" role="alert">
    ${msgText}
    </div>`;
    this.card.insertAdjacentHTML("beforebegin", msg);
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 2000);   
  }
}
//export the Ui class
export const ui = new Ui();
