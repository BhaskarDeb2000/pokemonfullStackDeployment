import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

app.get("/pokemon", async (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    );
    res.json({
      data: response.data.results,
      totalItems: response.data.count,
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/name", async (req, res) => {
  //const name =
  const pokemonAbilities = req.query.pokemonName;
  if (!pokemonAbilities) {
    res.send("Query not Found");
  } else {
    res.send("Query param has been requested");
  }
  ////try {
  //const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  ////}
});

app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}/`);
});
