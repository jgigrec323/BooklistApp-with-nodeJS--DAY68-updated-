const mysql = require("mysql")
const dbOptions = require("./config/db-config")

const connexion = mysql.createConnection(dbOptions);

connexion.connect(err => {
    if (err) throw err
    console.log("connected succesfully")

    let booklist = ` CREATE TABLE IF NOT EXISTS booklist(
        id int primary key auto_increment,
        title varchar(255),
        author varchar(255),
        isbn int
    ) `

    connexion.query(booklist, function(err, result, fields) {
        if (err) throw err
            /* console.log("table created") */
    })

})


module.exports = connexion;