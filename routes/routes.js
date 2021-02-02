const path = require('path')
const fs = require('fs')
const uniqid = require('uniqid')

module.exports = (app) => {
    fs.readFile("db/db.json", (err, data) => {
        if (err)
            throw error;
        var notes = JSON.parse(data);        
        
        app.get("/api/notes", (req, res) => {
            res.json(notes);
        });

        app.post("/api/notes", (req, res) => {
            let newNote = req.body;
            notes.push(newNote);
            newNote.id = uniqid()
            updateDB();
            res.send(req.body)
            console.log("Added new notes")
        });

        app.get("/api/notes/:id", (req, res) => {
            res.json(notes[req.params.id]);
        });

        app.delete("/api/notes/:id", (req, res) => {
            notes.splice(req.params.id, 1);
            updateDB()
            res.send(req.body)
            console.log("Deleted notes")
        });

        app.get('/notes', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/notes.html'));
        });
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/index.html'));
        });



        updateDB = () => {
            fs.writeFile("db/db.json", JSON.stringify(notes), err => {
                if (err) throw err;
                return true;
            })
        }
    })



}