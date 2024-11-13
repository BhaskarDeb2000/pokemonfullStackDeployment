import React, { useState, useEffect } from "react";
import axios from "axios";

const PokemonImage = ({ pokemonName }) => {
  const [pokemonImage, setPokemonImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    try {
      const fetchAbilities = async () => {
        const response = await axios.get(
          `http://localhost:5001/pokemon/abilites/?name=${pokemonName}`
        );
        setPokemonImage(response.data.abilities.sprites.front_default);
        console.log(response.data.abilities.sprites.front_default);
      };
      fetchAbilities();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [pokemonName]);

  return (
    <div>
      {error ? (
        <p>{error.message}</p>
      ) : loading ? (
        <p>loading...</p>
      ) : (
        <img src={pokemonImage} height="150px" alt="pokemonPic"></img>
      )}
    </div>
  );
};

export default PokemonImage;
