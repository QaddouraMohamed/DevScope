import { createCandidat } from "./api.js";
import { setCache, getCache } from "./cache.js";
import { filterObj } from "./profil.js";

export async function getData(username) {
  const url = `https://api.github.com/users/${username}`;
  const key = `devscope:user:${username}`;

  try {
    let result = getCache(key);
    if (!result) {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.status);
      }
      result = await response.json();
      setCache(key, result);
    }
    // add the user to aside
    document.querySelector("#filter-section").classList.remove("hidden");
    document.querySelector("main").classList.remove("hidden");
    const date = new Date(result.created_at);
    document.querySelector("#profile-pic").style.backgroundImage =
      `url(${result.avatar_url})`;
    document.querySelector("#name").textContent = result.name;
    document.querySelector("#user-name").textContent = result.login;
    document.querySelector("#title").textContent = result.bio;
    document.querySelector("#localisation").textContent = result.location;
    document.querySelector("#member-since").textContent =
      `Membre depuis ${date.toLocaleDateString("fr-FR", { month: "long" })} ${date.getFullYear()}`;
    document.querySelector("#depots").textContent = result.public_repos;
    document.querySelector("#abonnes").textContent = result.followers;
    document.querySelector("#abonnements").textContent = result.following;
    document.querySelector("#see-profil").href = result.html_url;

    //add to shortlist functionality
    document
      .querySelector("#add-to-shortlist")
      .addEventListener("click", () => createCandidat(result));
  } catch (error) {
    console.error(error.message);
    switch (error.message) {
      case "404":
        document.querySelector("#err-section").classList.remove("hidden");
        document.querySelector("#err-num").textContent = 404;
        document.querySelector("#res-status").textContent =
          "Utilisateur introuvable. Vérifiez le nom d`utilisateur et réessayez.";
        break;
      case "403":
      case "429":
        document.querySelector("#err-section").classList.remove("hidden");
        document.querySelector("#err-num").textContent = 403;
        document.querySelector("#res-status").textContent =
          "Limite de requêtes GitHub atteinte. Veuillez patienter quelques minutes avant de réessayer.";
        break;
      default:
        document.querySelector("#err-section").classList.remove("hidden");
        document.querySelector("#res-status").textContent =
          "Une erreur est survenue. Veuillez réessayer plus tard.";
        break;
    }
  }
}

export async function getReposData(username) {
  const url = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;
  const key = `devscope:repos:${username}`;

  try {
    let result = getCache(key);
    if (!result) {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      result = await response.json();
      setCache(key, result);
    }
    // add the repos number to the section
    const filtred = result.filter((repo) => {
      return (
        repo.name
          .toLowerCase()
          .includes(filterObj.search.toLowerCase().trim()) &&
        (filterObj.filter === "tous" || repo.language === filterObj.filter)
      );
    });

    // add the repos number to the section
    document.querySelector("#depots-num").textContent = filtred.length;

    //clearing the repos container before adding the repos to it
    document.querySelector("#repos-container").innerHTML = "";

    //adding the repos
    filtred.forEach((repo) => {
      const clone = document
        .querySelector("#repos-template")
        .content.cloneNode(true);
      const date = new Date(repo.updated_at);
      const days = Math.floor((Date.now() - date) / (1000 * 60 * 60 * 24));

      clone.querySelector(".repo-name").textContent = repo.name;
      clone.querySelector(".description").textContent = repo.description
        ? repo.description
        : "Aucune description";
      clone.querySelector(".most-lang").textContent = repo.language
        ? repo.language
        : "No_Lang";
      clone.querySelector(".stars").textContent = repo.stargazers_count;
      clone.querySelector(".forks").textContent = repo.forks_count;
      clone.querySelector(".last-update").textContent =
        `Mise a jour il y a ${days} jours`;

      document.querySelector("#repos-container").append(clone);
    });
  } catch (error) {
    console.error(error.message);
  }
}
