const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json()); 

const uri = "mongodb://localhost:27017";


app.get("/api/mycollection", async (req, res) => {
  const client = await MongoClient.connect(uri);
  const myCollection = await client.db("crud").collection("mycollection").find({}).toArray();
  res.json(myCollection);
  client.close();
});


app.post("/api/mycollection", async (req, res) => {
  const client = await MongoClient.connect(uri);
  const myCollection = client.db("crud").collection("mycollection");

  const { id, name, gmail, password } = req.body;

  try {
    await myCollection.insertOne({ id, name, gmail, password });
    res.status(201).send("Data inserted successfully");
  } catch (err) {
    res.status(500).send("Error inserting data");
  } finally {
    client.close();
  }
});











app.put("/api/mycollection/:id", async (req, res) => {
    const client = await MongoClient.connect(uri);
    const myCollection = client.db("crud").collection("mycollection");
    const { id } = req.params;
    const { name, gmail, password } = req.body;
  
    try {
      const result = await myCollection.updateOne(
        { id: parseInt(id) }, 
        { $set: { name, gmail, password } } 
      );
  
      if (result.matchedCount === 0) {
        res.status(404).send("No document found with this ID");
      } else {
        res.status(200).send("Data updated successfully");
      }
    } catch (err) {
      res.status(500).send("Error updating data");
    } finally {
      client.close();
    }
  });
  






  app.delete("/api/mycollection/:id", async (req, res) => {
    const client = await MongoClient.connect(uri);
    const myCollection = client.db("crud").collection("mycollection");
    const { id } = req.params;
  
    try {
      const result = await myCollection.deleteOne({ id: parseInt(id) });
      if (result.deletedCount === 0) {
        return res.status(404).send("Data not found");
      }
      res.send("Data deleted successfully");
    } catch (err) {
      res.status(500).send("Error deleting data");
    } finally {
      client.close();
    }
  });
  
  





















app.listen(5000, () => console.log("Server running on http://localhost:5000"));











