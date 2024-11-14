import express from "express";
import cors from "cors";

import HomeRoute from "./routes/HomeRoute.js";
import ImageRoute from "./routes/ImageRoute.js";
//import AbilitiesRoute from "./routes/AbilitiesRoute.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

app.use("/pokemon", HomeRoute);
app.use("/pokemon/images", ImageRoute);

app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}/`);
});
