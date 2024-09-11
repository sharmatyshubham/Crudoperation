




import React, { useState, useEffect } from "react";
import Form5 from "./Form5";
import DataTable from "./DataTable";
import axios from "axios";
import { Box } from "@mui/material";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/mycollection");
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  const handleAddData = (newData) => {
    setData((prevData) => [...prevData, newData]);
  };

  
  const handleUpdateData = (updatedData) => {
    setData((prevData) =>
      prevData.map((item) => (item.id === updatedData.id ? updatedData : item))
    );
  };

  
  const handleDeleteData = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: 4,
      }}
    >
      <Form5 handleAddData={handleAddData} />

      <Box sx={{ marginLeft: 4, marginTop: 15 }}>
        <DataTable
          data={data}
          loading={loading}
          error={error}
          handleUpdateData={handleUpdateData}  
          handleDeleteData={handleDeleteData}  
        />
      </Box>
    </Box>
  );
}
