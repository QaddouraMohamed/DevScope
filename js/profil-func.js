export async function getData(username) {
  const url = `https://api.github.com/users/${username}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const result = await response.json();
    // add the user to aside
    document.querySelector("main").classList.remove("hidden");
    const date = new Date(result.created_at);
    document.querySelector("#profile-pic").style.backgroundImage =
      `url(${result.avatar_url})`;
    document.querySelector("#name").textContent = result.name;
    document.querySelector("#user-name").textContent = result.login;
    console.log(result.login);
    document.querySelector("#title").textContent = result.bio;
    document.querySelector("#localisation").textContent = result.location;
    document.querySelector("#member-since").textContent =
      `Membre depuis ${date.toLocaleDateString("fr-FR", { month: "long" })} ${date.getFullYear()}`;
    document.querySelector("#depots").textContent = result.public_repos;
    document.querySelector("#abonnes").textContent = result.followers;
    document.querySelector("#abonnements").textContent = result.following;
    document.querySelector("#see-profil").href = result.html_url;

    // add the repos number to the section
    document.querySelector("#depots-num").textContent = result.public_repos;
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
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();

    // add the repos number to the section
    result.forEach((repo) => {
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
