import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import PokemonImage from "./Components/PokemonImage";
import {
  Box,
  Card,
  Typography,
  CardContent,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/pokemon/?offset=${offset}&limit=${limit}`
        );
        setPokemonList(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [offset]);

  const next = (next) => {
    setOffset(offset + 10);
  };

  const previous = (previous) => {
    setOffset(offset - 10);
  };

  return (
    <div className="App">
      {error ? (
        <Typography>{error.message}</Typography>
      ) : loading ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "16px",
            width: "100%",
            maxWidth: "1200px",
            margin: "auto",
          }}
        >
          {pokemonList?.map((pokemon, index) => (
            <Card key={index} sx={{ maxWidth: 200 }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {pokemon.name}
                </Typography>
                <PokemonImage pokemonName={pokemon.name} />
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={previous} disabled={offset <= 0}>
            Prev
          </Button>

          <Button variant="contained" onClick={next}>
            Next
          </Button>
        </Stack>
      </div>
    </div>
  );
}

export default App;
