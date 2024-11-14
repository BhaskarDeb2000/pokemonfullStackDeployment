import axios from "axios";
import express from "express";

const router = exporess.Router()

router.get("/", async (req, res))=>{
const offset = req.query.offset || 0;
try {
const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${offset}`)
res.json(response.data.ability)
} catch (error) {
console.error(error);
}
});

export default router;