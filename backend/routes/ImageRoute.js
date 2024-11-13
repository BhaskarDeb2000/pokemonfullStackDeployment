import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  const name = req.query.name;
  console.log(name);

  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}/`
    );
    res.json({
      abilities: response.data,
    });
  } catch (error) {
    console.error(error);
  }
});

export default router;
