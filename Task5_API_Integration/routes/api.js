const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dbPath = path.join(__dirname, '../db.json');

// Helper to read/write JSON file
const readDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// GET all users
router.get('/users', (req, res) => {
  const db = readDB();
  res.json(db.users);
});

// POST a new user
router.post('/users', (req, res) => {
  const db = readDB();
  const newUser = {
    id: db.users.length + 1,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    status: req.body.status,
  };
  db.users.push(newUser);
  writeDB(db);
  res.status(201).json(newUser);
});

// PUT to update a user
router.put('/users/:id', (req, res) => {
  const db = readDB();
  const userId = parseInt(req.params.id, 10);
  const user = db.users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  Object.assign(user, req.body);
  writeDB(db);
  res.json(user);
});

// DELETE a user
router.delete('/users/:id', (req, res) => {
  const db = readDB();
  const userId = parseInt(req.params.id, 10);
  const updatedUsers = db.users.filter((u) => u.id !== userId);

  if (updatedUsers.length === db.users.length) {
    return res.status(404).json({ error: 'User not found' });
  }

  db.users = updatedUsers;
  writeDB(db);
  res.status(204).send();
});

module.exports = router;
