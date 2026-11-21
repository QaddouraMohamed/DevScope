import { filterObj } from "./shortlist.js";

export async function getShortlist(MOCKAPI_URL) {
  try {
    const response = await fetch(MOCKAPI_URL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();

    const filtred = result.filter((user) => {
      return (
        user.login
          .toLowerCase()
          .includes(filterObj.search.toLowerCase().trim()) &&
        (filterObj.filter === "tous" || user.status === filterObj.filter)
      );
    });

    //show how many candidat(s)
    document.querySelector("#candidats-num").textContent =
      `${filtred.length} candidat(s) dans votre shortlist`;

    //0 candidat case
    if (filtred.length === 0) {
      document.querySelector("#no-user").classList.remove("hidden");
      document.querySelector("#users-container").innerHTML = "";
    } else {
      document.querySelector("#no-user").classList.add("hidden");
      // add the repos number to the section
      document.querySelector("#users-container").innerHTML = "";
      filtred.forEach((user) => {
        const clone = document
          .querySelector("#users-template")
          .content.cloneNode(true);
        const date = new Date(user.createdAt).toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        });
        const statut = clone.querySelector(".statut");
        const statutContainer = clone.querySelector(".statut-container");

        clone.querySelector(".user-card").dataset.id = user.id;
        clone.querySelector(".profile-pic").style.backgroundImage =
          `url(${user.avatar_url})`;
        clone.querySelector(".name").textContent = user.name;
        clone.querySelector(".user").textContent = user.login;
        clone.querySelector(".most-lang").textContent = user.language;
        clone.querySelector(".note").textContent = user.note;
        clone.querySelector(".add-time").textContent = `Ajoute le ${date}`;

        clone.querySelector(".rate").dataset.rate = user.rating;
        for (let i = 0; i < Number(user.rating); i++) {
          clone
            .querySelector(".rate")
            .children[i].classList.add("text-yellow-300");
        }

        if (user.status) {
          statut.textContent = user.status;
        } else {
          statut.textContent = "A Contacter";
        }

        if (user.status === "Retenu") {
          statutContainer.classList.add("text-green-400");
        } else if (user.status === "Refusé") {
          statutContainer.classList.add("text-red-400");
        }

        document.querySelector("#users-container").append(clone);
      });
    }
  } catch (error) {
    console.error(error.message);
  }
}

export function showSection(section) {
  section.classList.remove("hidden");
}

export function hideSection(section) {
  section.classList.add("hidden");
}
