export async function getData(username) {
  const url = `https://api.github.com/users/${username}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    // add the user to aside
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
  }
}
