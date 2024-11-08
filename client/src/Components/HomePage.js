import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";

import Card from "@mui/material/Card";

const Pokemon = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(1);

  const limit = 18;

  useEffect(() => {
    const fetchData = async () => {
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
    setOffset(offset + 1);
  };

  const decrease = () => {
    setOffset(offset - 1);
  };

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card-grid">
          {data?.map((i, index) => (
            <div key={index}>
              <Card>
                <h2>{i.name}</h2>
              </Card>
            </div>
          ))}
        </div>
      )}
      <div className="button-group">
        <Button variant="contained" color="primary" onClick={decrease}>
          decrease
        </Button>
        <p className="offset-display">{offset + 1}</p>
        <Button variant="contained" color="primary" onClick={increase}>
          increase
        </Button>
      </div>
    </div>
  );
};

export default Pokemon;
