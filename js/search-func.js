export function checkUser(event) {
  const usernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

  if (!usernameRegex.test(event.target.value) && event.target.value) {
    document.querySelector("#error-msg").classList.remove("hidden");
    document.querySelector("#analyser").setAttribute("disabled", "");
  } else if (!event.target.value) {
    document.querySelector("#error-msg").classList.add("hidden");
    document.querySelector("#analyser").setAttribute("disabled", "");
  } else if (usernameRegex.test(event.target.value)) {
    document.querySelector("#error-msg").classList.add("hidden");
    document.querySelector("#analyser").removeAttribute("disabled", "");
  }
}

export function searchUser(event) {
  event.preventDefault();
  const userInput = document.querySelector("#user").value;
  window.location.href = `./profil.html?user=${encodeURIComponent(userInput)}`;
}
