import { Button } from "@mui/material";
import React from "react";

const LoadMoreButton = ({ loadPokemonList }) => {
  return (
    <Button
      variant="filled"
      onClick={loadPokemonList}
      style={{
        marginBottom: "30px",
        backgroundColor: "#97abd2",
        maxWidth: "200px",
        textDecorationColor: "black",
      }}
    >
      Load More...
    </Button>
  );
};
export default LoadMoreButton;
