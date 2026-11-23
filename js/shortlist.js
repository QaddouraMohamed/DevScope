import { MOCKAPI_URL } from "./config.js";
import { getShortlist, showSection, hideSection } from "./shortlist-func.js";
import { deleteCandidat, modifyCandidat } from "./api.js";
import { coloringClicked } from "./ui.js";

const usersContainer = document.querySelector("#users-container");
const deleteSection = document.querySelector("#delete");
const modifySection = document.querySelector("#modify");
const formModify = document.querySelector("#form-modify");
const userCard = document.querySelector(".user-card");
const tous = document.querySelector("#tous");
const contacter = document.querySelector("#a-contacter");
const entretien = document.querySelector("#entretien");
const retenu = document.querySelector("#retenu");
const refuse = document.querySelector("#refuse");
const search = document.querySelector("#search");

export const filterObj = { search: "", filter: "tous" };
let id,
  name,
  user,
  mostLang = null;

getShortlist(MOCKAPI_URL);

usersContainer.addEventListener("click", (event) => {
  const userCard = event.target.closest(".user-card");
  id = userCard.dataset.id;

  if (event.target.closest(".btn-delete")) {
    showSection(deleteSection);
  }

  if (event.target.closest(".btn-modify")) {
    showSection(modifySection);
    modifySection.querySelector("#note").value =
      userCard.querySelector(".note").textContent;
    modifySection.querySelector("#statut").value =
      userCard.querySelector(".statut").textContent;
    modifySection.querySelector("#rating").value =
      userCard.querySelector(".rate").dataset.rate;
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
    hideSection(deleteSection);
    await deleteCandidat(id);
    getShortlist(MOCKAPI_URL);
  });

formModify.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(formModify));
  const modifications = {
    status: data.statut,
    rating: data.rating,
    note: data.note,
  };
  hideSection(modifySection);
  await modifyCandidat(id, modifications);
  getShortlist(MOCKAPI_URL);
  modifySection.querySelector("#statut").value = "";
  modifySection.querySelector("#rating").value = "";
});

tous.addEventListener("click", () => {
  coloringClicked(tous);
  filterObj.filter = "tous";
  getShortlist(MOCKAPI_URL);
});

contacter.addEventListener("click", () => {
  coloringClicked(contacter);
  filterObj.filter = "A Contacter";
  getShortlist(MOCKAPI_URL);
});

entretien.addEventListener("click", () => {
  coloringClicked(entretien);
  filterObj.filter = "Entretien";
  getShortlist(MOCKAPI_URL);
});

retenu.addEventListener("click", () => {
  coloringClicked(retenu);
  filterObj.filter = "Retenu";
  getShortlist(MOCKAPI_URL);
});

refuse.addEventListener("click", () => {
  coloringClicked(refuse);
  filterObj.filter = "Refusé";
  getShortlist(MOCKAPI_URL);
});

search.addEventListener("input", () => {
  filterObj.search = search.value;
  getShortlist(MOCKAPI_URL);
});
