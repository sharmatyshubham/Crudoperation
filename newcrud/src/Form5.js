
import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography } from "@mui/material";

export default function Form5({ handleAddData }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [gmailTouched, setGmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const isNameValid = name.length >= 3;
  const isGmailValid = gmail.includes("@gmail.com");
  const isPasswordValid = password.length > 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/mycollection");
        const data = response.data;

        if (data.length > 0) {
          const highestId = Math.max(...data.map((item) => parseInt(item.id)));
          setId(highestId + 1);
        } else {
          setId(1);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isNameValid || !isGmailValid || !isPasswordValid) {
      alert("Please fill all fields correctly.");
      return;
    }

    const formData = {
      id,
      name,
      gmail,
      password,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/mycollection", formData);

      if (response.status === 201) {
        alert("Data submitted successfully!");
        setName("");
        setGmail("");
        setPassword("");
        setId((prevId) => prevId + 1);
        handleAddData(formData); 
      } else {
        alert("Failed to submit data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting data");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        minHeight: "100vh",
        marginTop: "20px",
        padding: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: 2,
          boxShadow: 3,
          padding: 4,
          maxWidth: 400,
          width: "100%",
          marginLeft: "40px",
        }}
      >
        <Typography variant="h4" component="h1" sx={{ textAlign: "center", marginBottom: 3, color: "#00796b" }}>
          User Registration
        </Typography>

        <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
          ID: {id}
        </Typography>

        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setNameTouched(true)}
          fullWidth
          margin="normal"
          error={nameTouched && !isNameValid}
          helperText={nameTouched && !isNameValid ? "Name should be at least 3 characters" : ""}
          variant="outlined"
        />

        <TextField
          label="Gmail"
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
          onFocus={() => setGmailTouched(true)}
          fullWidth
          margin="normal"
          error={gmailTouched && !isGmailValid}
          helperText={gmailTouched && !isGmailValid ? "Enter a valid Gmail" : ""}
          variant="outlined"
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setPasswordTouched(true)}
          fullWidth
          margin="normal"
          error={passwordTouched && !isPasswordValid}
          helperText={passwordTouched && !isPasswordValid ? "Password must be longer than 6 characters" : ""}
          variant="outlined"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 3, padding: 1.5 }}
          disabled={!isNameValid || !isGmailValid || !isPasswordValid}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
