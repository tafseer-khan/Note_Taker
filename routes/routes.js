const path = require('path')

module.exports = (app) => {
    app.get('/notes', (req,res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    })
    app.get('*',(req,res) =>{
        res.sendFile(path.join(__dirname, '../public/index.html'));
    })

    app.get("api/notes", (req,res) =>{
        res.json(notes);
    })

    app.post("api/notes", (req,res) =>{
        let newNote = req.body;
        notes.push(newNote);
        return console.log("Added new note")
    })
    

}