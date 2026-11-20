import { MOCKAPI_URL } from "./config.js";
import { getShortlist } from "./shortlist-func.js";

export async function createCandidat(result) {
  const nouveauCandidat = {
    login: result.login,
    name: result.name,
    avatar_url: result.avatar_url,
    html_url: result.html_url,
    language: "JavaScript",
    rating: "",
    status: "a-contacter",
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

export async function deleteCandidat(id) {
  const url = `${MOCKAPI_URL}/${id}`;
  try {
    const response = await fetch(url, { method: "DELETE" });
    if (!response.ok) {
      throw new Error(response.status);
    }
    getShortlist(MOCKAPI_URL);
  } catch (error) {
    console.error(error.message);
  }
}

export async function modifyCandidat(id, modifications) {
  const url = `${MOCKAPI_URL}/${id}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(modifications),
    });
    if (!response.ok) {
      throw new Error(response.status);
    }
    getShortlist(MOCKAPI_URL);
  } catch (error) {
    console.error(error.message);
  }
}
