import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
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

export default router;
