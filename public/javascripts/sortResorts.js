function sortResorts(criteria) {
  const resortContainer = document.querySelector(".resort-container");
  const resorts = Array.from(resortContainer.children);

  const sortedResorts = resorts
    .map((resort) => ({
      element: resort,
      name: resort.querySelector(".resort-card--title").textContent,
      state: resort.querySelector(".resort-card--body").textContent,
    }))
    .filter((resort) => resort.name && resort.state); // Ensure names and states are present

  switch (criteria) {
    case "state":
      sortedResorts.sort((a, b) => a.state.localeCompare(b.state));
      break;
    case "alphabetical":
      sortedResorts.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  // Clear existing resorts and append the sorted ones
  resortContainer.innerHTML = "";
  sortedResorts.forEach((resort) =>
    resortContainer.appendChild(resort.element)
  );
}
