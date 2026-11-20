import { MOCKAPI_URL } from "./config.js";
import { getShortlist, showSection, hideSection } from "./shortlist-func.js";
import { deleteCandidat, modifyCandidat } from "./api.js";

const usersContainer = document.querySelector("#users-container");
const deleteSection = document.querySelector("#delete");
const modifySection = document.querySelector("#modify");
const formModify = document.querySelector("#form-modify");
const userCard = document.querySelector(".user-card");

let id,
  name,
  user,
  mostLang = null;

getShortlist(MOCKAPI_URL);

usersContainer.addEventListener("click", (event) => {
  const userCard = event.target.closest(".user-card");
  id = userCard.dataset.id;
  name = userCard.querySelector(".name");
  user = userCard.querySelector(".user");
  mostLang = userCard.querySelector(".most-lang");
  const note = userCard.querySelector(".note").textContent;
  if (event.target.closest(".btn-delete")) {
    showSection(deleteSection);
  }

  if (event.target.closest(".btn-modify")) {
    showSection(modifySection);
    modifySection.querySelector("#note").value = note;
  }
});

document.querySelectorAll(".exit-delete").forEach((btn) => {
  btn.addEventListener("click", () => {
    hideSection(deleteSection);
  });
});

document.querySelectorAll(".exit-modify").forEach((btn) => {
  btn.addEventListener("click", () => {
    modifySection.querySelector("#statut").value = "";
    modifySection.querySelector("#rating").value = "";
    hideSection(modifySection);
  });
});

document
  .querySelector("#confirm-delete")
  .addEventListener("click", async () => {
    deleteCandidat(id);
    hideSection(deleteSection);
  });

formModify.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(formModify));
  const modifications = {
    status: data.statut,
    rating: data.rating,
    note: data.note,
  };
  modifyCandidat(id, modifications);
  modifySection.querySelector("#statut").value = "";
  modifySection.querySelector("#rating").value = "";
  hideSection(modifySection);
});
