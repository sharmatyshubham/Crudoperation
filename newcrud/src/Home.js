import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "./DataTable";
import Form5 from "./Form5";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/mycollection");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddData = (newData) => {
    setData((prevData) => [...prevData, newData]);
  };

  const handleUpdateData = async (updatedItem) => {
    try {
      await axios.put(`http://localhost:5000/api/mycollection/${updatedItem.id}`, updatedItem);
      setData((prevData) =>
        prevData.map((item) => (item.id === updatedItem.id ? updatedItem : item))
      );
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDeleteData = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/mycollection/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div>
      <Form5 handleAddData={handleAddData} />
      <DataTable
        data={data}
        loading={loading}
        error={error}
        handleUpdateData={handleUpdateData}
        handleDeleteData={handleDeleteData}
        style={{width:"600px",marginright:"2px"}}
      />
    </div>
  );
}

















