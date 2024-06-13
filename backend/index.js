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

    // get nextid and insert data
    let nextId = data.reduce((acc, curr) => {
      const currentId = parseInt(curr.id, 10);
      return currentId > acc ? currentId : acc;
    }, 0) + 1;
    const idData = {
      id: nextId,
      ...newData
    }
    data.push(idData);
    writeData(data);
    console.log('Create:', idData);
    res.status(201).send(idData);
  } catch (err) {
    console.error('Error creating new issue:', err);
    res.status(500).send('Error creating new issue');
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
    const index = data.findIndex(item => item.id.toString() === id.toString());
    if (index !== -1) {
      updatedData.id = data[index].id;
      data[index] = updatedData;
      writeData(data);
      console.log('Update:', updatedData);
      res.status(200).send(updatedData);
    } else {
      res.status(404).send({ message: 'Data not found' });
    }
  } catch (error) {
    console.error('Error updating issue:', error);
    res.status(500).send('Error updating issue');
  }
});

/**
 * Delete: prints/logs out the object or id to delete
 */
app.delete("/api/issues/:id", (req, res) => {
  const { id } = req.params;
  let data = readData();
  const index = data.findIndex(item => item.id.toString() === id.toString());
  if (index !== -1) {
    const deletedData = data.splice(index, 1);
    writeData(data);
    console.log('Delete:', deletedData);
    res.status(204).send();
  } else {
    res.status(404).send({ message: 'Data not found' });
  }
});

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});