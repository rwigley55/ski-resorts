function liftStatus() {
  const liftStatusElements = document.querySelectorAll(".text-closed");

  liftStatusElements.forEach((element) => {
    if (element.innerText.trim().toLowerCase() === "open") {
      element.classList.remove("text-closed");
      element.classList.add("text-open");
    } else {
      element.classList.remove("text-open");
      element.classList.add("text-closed");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  liftStatus();
});
