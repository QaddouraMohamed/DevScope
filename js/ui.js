export function coloringClicked(filter) {
  document.querySelectorAll(".filter-btns >button").forEach((btn) => {
    btn.classList.remove("text-blue-300");
  });
  filter.classList.add("text-blue-300");
}
