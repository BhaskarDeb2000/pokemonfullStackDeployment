import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

const Pokemon = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);

  const limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://pokemonfull-stack-backend.vercel.app/pokemon/?offset=${offset}&limit=${limit}`
        );

        setData(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [offset]);

  const increase = () => {
    setOffset(offset + 10);
  };

  const decrease = () => {
    setOffset(offset - 10);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {error ? (
        <Alert severity="error">{error.message}</Alert>
      ) : loading ? (
        <CircularProgress />
      ) : (
        <Box
          className="card-grid"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "16px",
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          {data?.map((i, index) => (
            <Card key={index} sx={{ borderRadius: "8px", boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {i.name.toUpperCase()} <br />
                  <Button onClick={() => (window.location.href = i.url)}>
                    Click here
                  </Button>
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
      <Box
        className="button-group"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={decrease}
          disabled={offset <= 0}
          sx={{ minWidth: "100px" }}
        >
          Previous
        </Button>
        <Typography variant="body1" className="offset-display"></Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={increase}
          sx={{ minWidth: "100px" }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Pokemon;
