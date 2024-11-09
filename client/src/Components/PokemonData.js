import React, { useState, useEffect } from "react";
import axios from "axios";

const PokemonData = () => {
  const [name, setName] = useState("");
  useEffect(() => {
    const fetchName = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/name?pokemonName=alak"
        );
        console.log(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchName();
  }, []);
  return <h1>Hello</h1>;
};

export default PokemonData;
