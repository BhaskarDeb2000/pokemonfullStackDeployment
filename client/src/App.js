import React, { useState, useEffect } from "react";
import axios from "axios";

import PokemonImage from "./Components/PageComponents/PokemonImage";

import Error from "./Components/ElementComponents/Error";
import ToggleDarkMode from "./Components/ElementComponents/Switch";
import LoadMoreButton from "./Components/ElementComponents/LoadMoreButton";

import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  CircularProgress,
  TextField,
} from "@mui/material";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const offset = 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokemonfull-stack-backend.vercel.app/pokemon/?offset=${offset}&limit=${limit}`
        );
        setPokemonList(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [limit]);

  const filterPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const ThemeChange = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isDarkMode ? "#99999" : "#ffffff",
        color: isDarkMode ? "#ffffff" : "#000000",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isDarkMode ? "#15242f" : "#5a667d",
        }}
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "104ch" } }}
        noValidate
        autoComplete="off"
      >
        <ToggleDarkMode
          handleThemeChange={ThemeChange}
          style={{ display: "flex" }}
        />
        <Typography>
          <h1
            style={{
              color: isDarkMode ? "#ffffff" : "#eff0f2",
              textAlign: "center",
            }}
          >
            Welcome to the Pokemon Information Center
          </h1>
        </Typography>
        <TextField
          style={{
            backgroundColor: "#aecde0",
            marginBottom: "50px",
            borderRadius: "5px",
          }}
          label="Search Your Pokemon Here"
          variant="filled"
          onChange={(prevValue) => setSearch(prevValue.target.value)}
          value={search}
        />
        <LoadMoreButton
          loadPokemonList={() => {
            setLimit(limit + 10);
          }}
        />
      </Box>

      {error ? (
        <Error message={error} />
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
            marginTop: "30px",
          }}
        >
          {filterPokemon?.map((pokemon, pokemonIndex) => (
            <Button
              key={pokemonIndex}
              onClick={() => console.log(`I was clicked ${pokemonIndex}`)}
            >
              <Card
                sx={{
                  minWidth: 200,
                  backgroundColor: isDarkMode ? "#15242f" : "#ffffff",
                  color: isDarkMode ? "#bacbd8" : "#15242f",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    style={{ marginBottom: "30px" }}
                  >
                    {pokemon.name.toUpperCase()}
                  </Typography>
                  <PokemonImage pokemonName={pokemon.name} />
                </CardContent>
              </Card>
            </Button>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "110vh",
              alignItems: "center",
            }}
          ></div>
        </Box>
      )}
    </div>
  );
}

export default App;
