import { MOCKAPI_URL } from "./config.js";
import { getShortlist, showSection, hideSection } from "./shortlist-func.js";
import { deleteCandidat } from "./api.js";

const usersContainer = document.querySelector("#users-container");
const deleteSection = document.querySelector("#delete");
const userCard = document.querySelector(".user-card");

let id = null;

getShortlist(MOCKAPI_URL);

usersContainer.addEventListener("click", (event) => {
  if (event.target.closest(".btn-delete")) {
    showSection(deleteSection);
    id = event.target.closest(".user-card").dataset.id;
  }
});

document.querySelectorAll(".exit-delete").forEach((btn) => {
  btn.addEventListener("click", () => {
    hideSection(deleteSection);
  });
});

document
  .querySelector("#confirm-delete")
  .addEventListener("click", async () => {
    const deleted = deleteCandidat(id);
    if (deleted) {
      hideSection(deleteSection);
      getShortlist(MOCKAPI_URL);
    }
  });
