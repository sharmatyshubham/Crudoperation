


import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, CircularProgress, Alert } from "@mui/material";
import axios from "axios";

export default function DataTable({ data, loading, error, setData, handleUpdateData, handleDeleteData }) {
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    gmail: "",
    password: "",
  });

  const handleEditClick = (item) => {
    setEditId(item.id);
    setEditForm({
      name: item.name,
      gmail: item.gmail,
      password: item.password,
    });
  };

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveClick = async () => {
    const updatedData = { id: editId, ...editForm };

    try {
      const response = await axios.put(
        `http://localhost:5000/api/mycollection/${updatedData.id}`,
        updatedData
      );

      if (response.status === 200) {
        alert("Data updated successfully!");
        handleUpdateData(updatedData);  
        setEditId(null);  
      } else {
        alert("Failed to update data.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Error updating data.");
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/mycollection/${id}`);

      if (response.status === 200) {
        alert("Data deleted successfully!");
        handleDeleteData(id);  
      } else {
        alert("Failed to delete data.");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Error deleting data.");
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">Error: {error}</Alert>;
  }

  return (
    <TableContainer component={Paper} style={{ marginTop: "5px" }}>
      <h2 style={{ padding: "16px" }}>My Employee List</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Gmail</TableCell>
            <TableCell>Password</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>
                {editId === item.id ? (
                  <TextField name="name" value={editForm.name} onChange={handleChange} fullWidth />
                ) : (
                  item.name
                )}
              </TableCell>
              <TableCell>
                {editId === item.id ? (
                  <TextField name="gmail" value={editForm.gmail} onChange={handleChange} fullWidth />
                ) : (
                  item.gmail
                )}
              </TableCell>
              <TableCell>
                {editId === item.id ? (
                  <TextField name="password" type="password" value={editForm.password} onChange={handleChange} fullWidth />
                ) : (
                  item.password
                )}
              </TableCell>
              <TableCell>
                {editId === item.id ? (
                  <Button variant="contained" color="primary" onClick={handleSaveClick}>Save</Button>
                ) : (
                  <Button variant="contained" color="secondary" onClick={() => handleEditClick(item)}>Edit</Button>
                )}
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteClick(item.id)}
                  style={{ marginLeft: "8px" }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
