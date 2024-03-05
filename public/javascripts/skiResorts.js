import { listNames } from "./listNames.js";

const options = {
  method: "GET",
  url: "https://ski-resorts-and-conditions.p.rapidapi.com/v1/resort",
  headers: {
    "X-RapidAPI-Key": "dff55fd0cfmsh7eda8dbf4d19716p1ec8d4jsn5e31decbde6e",
    "X-RapidAPI-Host": "ski-resorts-and-conditions.p.rapidapi.com",
  },
};

const skiResorts = async () => {
  let currentPage = 1;

  try {
    while (true) {
      const response = await axios.request({
        ...options,
        params: { page: currentPage },
      });

      //   console.log(response.data);
      //   listNames(response.data.data);

      // Check if there is a next page
      if (response.data.next_page) {
        currentPage = response.data.next_page;
      } else {
        break; // Exit the loop if there's no next page
      }
    }
  } catch (error) {
    console.error(error);
  }
};

skiResorts();
