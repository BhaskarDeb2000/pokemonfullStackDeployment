import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";

import Error from "../ElementComponents/Error";

const PokemonImage = ({ pokemonName }) => {
  const [pokemonImage, setPokemonImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    try {
      const fetchAbilities = async () => {
        const response = await axios.get(
          `http://localhost:5001/pokemon/images/?name=${pokemonName}`
        );
        setPokemonImage(
          response.data.abilities.sprites.other.showdown.front_default
        );
      };
      fetchAbilities();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [pokemonName]);

  return (
    <div>
      {error ? (
        <Error message={error} />
      ) : loading ? (
        <CircularProgress />
      ) : (
        <img src={pokemonImage} height="100px" alt="pokemonPic"></img>
      )}
    </div>
  );
};

export default PokemonImage;
