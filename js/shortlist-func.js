export async function getShortlist(MOCKAPI_URL) {
  try {
    const response = await fetch(MOCKAPI_URL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();

    // add the repos number to the section
    result.forEach((user) => {
      const clone = document
        .querySelector("#users-template")
        .content.cloneNode(true);
      const date = new Date(user.createdAt).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
      clone.querySelector(".profile-pic").style.backgroundImage =
        `url(${user.avatar_url})`;
      clone.querySelector(".name").textContent = user.name;
      clone.querySelector(".user").textContent = user.login;
      clone.querySelector(".most-lang").textContent = user.language;
      clone.querySelector(".note").textContent = user.note;
      clone.querySelector(".add-time").textContent = `Ajoute le ${date}`;

      document.querySelector("#users-container").append(clone);
    });
  } catch (error) {
    console.error(error.message);
  }
}
