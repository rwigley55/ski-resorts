if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const axios = require("axios");
const app = express();

// EJS
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Configs
app.use(express.static(path.join(__dirname, "public")));

// API Configuration
const apiOptions = {
  headers: {
    "X-RapidAPI-Key": process.env.SKI_API_KEY,
    "X-RapidAPI-Host": "ski-resorts-and-conditions.p.rapidapi.com",
  },
};

// Function to fetch ski resorts based on the provided slug (show)
const fetchSkiResorts = async (slug = "") => {
  try {
    const url = `https://ski-resorts-and-conditions.p.rapidapi.com/v1/resort/${slug}`;
    const response = await axios.get(url, apiOptions);
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Fetch all ski resorts (index)
const fetchAllSkiResorts = async () => {
  let currentPage = 1;
  const allSkiResorts = [];

  try {
    while (true) {
      const url = `https://ski-resorts-and-conditions.p.rapidapi.com/v1/resort`;
      const response = await axios.get(url, {
        ...apiOptions,
        params: { page: currentPage },
      });

      const resortsData = response.data.data;
      if (resortsData.length === 0) {
        break; // Exit the loop if there's no more data
      }

      allSkiResorts.push(...resortsData);

      if (response.data.next_page) {
        currentPage = response.data.next_page;
      } else {
        break; // Exit the loop if there's no next page
      }
    }

    return allSkiResorts;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Fetch all ski resorts and store them in a variable
const initializeApp = async () => {
  const allSkiResorts = await fetchAllSkiResorts();

  // Show route to display information about a specific ski resort
  app.get("/resorts/:slug", async (req, res) => {
    const { slug } = req.params;
    const resortData = await fetchSkiResorts(slug);

    if (resortData.length === 0) {
      return res.status(404).send("Ski resort not found");
    }

    res.render("resorts/show", { resort: resortData });
  });

  // Index route to display a list of ski resorts
  app.get("/resorts", (req, res) => {
    res.render("resorts/index", { skiResorts: allSkiResorts });
  });

  // Home route
  app.get("/", (req, res) => {
    res.render("home");
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Serving on Port ${port}`);
  });
};

initializeApp();
