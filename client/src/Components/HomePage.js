import React, { useState, useEffect } from "react";
import axios from "axios";

const Pokemon = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(5);

  const offset = 0;

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
  }, [limit]);

  const increase = () => {
    setLimit(limit + 1);
  };

  const decrease = () => {
    setLimit(limit - 1);
  };

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        data?.map((i, index) => (
          <div key={index}>
            <h1>{i.name}</h1>
            <p>
              Lorem ipsum dolor sit amet, <br />
              consectetur adipiscing elit.
            </p>
          </div>
        ))
      )}
      <button onClick={decrease}>{limit} decrease</button>
      <button onClick={increase}>{limit} increase</button>
    </div>
  );
};

export default Pokemon;
