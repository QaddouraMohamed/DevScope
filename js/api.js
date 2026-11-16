import { MOCKAPI_URL } from "./config.js";

export async function createCandidat(result) {
  const nouveauCandidat = {
    login: result.login,
    name: result.name,
    avatar_url: result.avatar_url,
    html_url: result.html_url,
    language: "JavaScript",
    rating: 3,
    status: "À contacter",
    note: result.blog,
    createdAt: new Date().toISOString(),
  };
  let found = false;
  try {
    const response = await fetch(MOCKAPI_URL);
    if (!response.ok) throw new Error(response.status);
    const result = await response.json();
    found = result.some((user) => user.login === nouveauCandidat.login);
    if (found) {
      document.querySelector("#exist-msg").classList.remove("hidden");
      setTimeout(() => {
        document.querySelector("#exist-msg").classList.add("hidden");
      }, 2000);
    } else {
      await fetch(MOCKAPI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nouveauCandidat),
      });
      document.querySelector("#success-msg").classList.remove("hidden");
      setTimeout(() => {
        document.querySelector("#success-msg").classList.add("hidden");
      }, 2000);
    }
  } catch (error) {
    console.error(error.message);
  }
}
