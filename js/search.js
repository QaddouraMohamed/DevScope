import { checkUser, searchUser } from "./search-func.js";

const search = document.querySelector("form");
const user = document.querySelector("#user");

user.addEventListener("input", (event) => checkUser(event));

search.addEventListener("submit", (event) => searchUser(event));
