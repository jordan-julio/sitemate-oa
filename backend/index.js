const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;

app.use(bodyParser.json());

const dataFilePath = './data.json';

// Helper functions to read and write data
const readData = () => {
  try {
    return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  } catch (error) {
    console.error('Error reading from data file:', error);
    return [];
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing to data file:', error);
  }
};

/**
 * Create: Accepts a JSON file object & prints/logs the object
 * store locally in a JSON file
 * JSON Objects: id, title, description
 */
app.post("/api/issues", (req, res) => {
  try {
    const newData = req.body;
    const data = readData();
    data.push(newData);
    writeData(data);
    console.log('Create:', newData);
    res.status(201).send(newData);
  } catch (err) {
    res.status(500).send('Error creating new issue', err);
  }
});

/**
 * Read: returns a static JSON object
 */
app.get("/api/issues", (req, res) => {
  const data = readData();
  res.status(200).send(data);
});

/**
 * Update: Accepts a JSON file object & prints/logs the object
 */
app.put("/api/issues/:id", (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    let data = readData();
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
      data[index] = updatedData;
      writeData(data);
      console.log('Update:', updatedData);
      res.status(200).send(updatedData);
    } else {
      res.status(404).send({ message: 'Data not found' });
    }
  } catch {
    res.status(500).send('Error updating issue');
  }
});

/**
 * Delete: prints/logs out the object or id to delete
 */
app.delete("/api/issues", (req, res) => {
  const { id } = req.params;
  let data = readData();
  const newData = data.filter(item => item.id !== id);
  writeData(newData);
  console.log('Delete:', id);
  res.status(204).send();
});

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});