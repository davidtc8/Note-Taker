// Dependencies
const api = require('express').Router();
const path = require('path');
const fs = require('fs');
let uniqid = require('uniqid')

// Returns all saved notes
api.get('/notes', (req, res) => {
    console.log(`${req.method} request received`)
    // Get all saved notes from the database
    res.sendFile(path.join(__dirname), "../db/db.json")
});

// Adds user note to database and puts it in the webpage
api.post('/notes', (req, res) => {
    console.log(`${req.method} request received`)
    let database = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'))
    let userNote = {
        title: req.body.title,
        text: req.body.text,
        id: uniqid(),
    }

    database.push(userNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(database));
    console.log(database)
    res.json(database);
});

api.delete('/notes/:id', (req, res) => {
    console.log(`${req.method} request received`)
    let database = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    const result = database.filter(note => note.id !== req.params.id);
    const updatedNotes = fs.writeFileSync('./db/db.json', JSON.stringify (result));
    res.json(result)
});

module.exports = api;