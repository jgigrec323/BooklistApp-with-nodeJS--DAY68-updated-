const express = require("express")
const cors = require('cors');
const connexion = require('./connection');
const { json } = require("express");
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello')
})

app.get('/books', (req, res) => {
    connexion.query("SELECT * FROM booklist", function(err, result) {
        if (err) throw err
        res.json(result)
    })
})


app.post('/add', (req, res) => {
    const { title, author, isbn } = req.body;

    let insertion = `INSERT INTO booklist (title, author, isbn) VALUES ("${title}", "${author}", ${isbn})`
    connexion.query(insertion, function(err, result) {
        if (err) throw err
        console.log(`${title} of ${author} added !`)
        res.send(result)
    })

})

app.delete('/delBook', (req, res) => {
    const { isbn } = req.body;

    connexion.query(`DELETE FROM booklist WHERE isbn=${isbn}`, function(err, result) {
        if (err) throw err
        console.log(`Book with isbn #${isbn} deleted !`)
        res.send(result)
    })
})

app.listen(PORT, function() {
    console.log(`Running on ${PORT}`)
})