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
  await fetch(MOCKAPI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nouveauCandidat),
  });
}
