export const listNames = (resorts) => {
  const container = document.querySelector("#container");
  for (let resort of resorts) {
    if (resort.country === "US" || resort.country === "CA") {
      const skiResort = document.createElement("p");
      skiResort.innerText = `Resort: ${resort.name} --- Country: ${resort.country}`;
      container.append(skiResort);
    }
  }
};
