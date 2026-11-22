import { getData, getReposData } from "./profil-func.js";
import { checkUser, searchUser } from "./search-func.js";
import { coloringClicked } from "./ui.js";
//search functionality --------------------
const search = document.querySelector("form");
const user = document.querySelector("#user");

user.addEventListener("input", (event) => checkUser(event));

search.addEventListener("submit", (event) => searchUser(event));
//getting user and repos-----------------------------------------
const username = new URLSearchParams(window.location.search).get("user");

getData(username);
getReposData(username);

// filter and search----------------------------------------------
const tous = document.querySelector("#tous");
const python = document.querySelector("#python");
const cpp = document.querySelector("#cpp");
const js = document.querySelector("#java-script");
const java = document.querySelector("#java");
const searchRepo = document.querySelector("#search");

export const filterObj = { search: "", filter: "tous" };

tous.addEventListener("click", () => {
  coloringClicked(tous);
  filterObj.filter = "Tous";
  getReposData(username);
});

python.addEventListener("click", () => {
  coloringClicked(python);
  filterObj.filter = "Python";
  getReposData(username);
});

cpp.addEventListener("click", () => {
  coloringClicked(cpp);
  filterObj.filter = "C++";
  getReposData(username);
});

js.addEventListener("click", () => {
  coloringClicked(js);
  filterObj.filter = "JavaScript";
  getReposData(username);
});

java.addEventListener("click", () => {
  coloringClicked(java);
  filterObj.filter = "Java";
  getReposData(username);
});

searchRepo.addEventListener("input", () => {
  filterObj.search = searchRepo.value;
  getReposData(username);
});
