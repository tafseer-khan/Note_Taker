const path = require('path')
const fs = require('fs')

module.exports = (app) => {
    fs.readFile("db/db.json", (err, data) => {
        if (err)
            throw error;
        let note = JSON.parse(data);

        app.get('/notes', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/notes.html'));
        })
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/index.html'));
        })

        app.get("/api/notes", (req, res) => {
            res.json(note);
        })

        app.post("/api/notes", (req, res) => {
            let newNote = req.body;
            note.push(newNote);
            updateDB();
            console.log("Added new note")
        })

        app.get("/api/notes/:id", (req, res) => {
            res.json(note[req.params.id]);
        })

        app.delete("/api/notes/:id", (req, res) => {
            note.splice(req.params.id, 1);
            updateDB()
            console.log("Deleted note")
        })

        updateDB = () => {
            fs.writeFile("db/db.json", JSON.stringify(note), err => {
                if (err) throw err;
                return true;
            })
        }
    })



}