//importar a dependência do sqlite3
const sqlite3  = require("sqlite3").verbose()

//criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//utilizar o objeto de banco de dados, para nossas operações
db.serialize(() => {

    //Com comandos SQL eu vou:

    // 1 - Criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            adress2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    // 2 - Inserir dados na tabela
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            adress2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
        `

    const values = [
        "https://www.infoescola.com/wp-content/uploads/2010/11/reciclagem.jpg",
        "Colectoria",
        "Guilherme Gemballa, Jardim América",
        "N° 260",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e Papelão"
    ]

    function afterInsertData(err){
        if(err) {
            return console.log(err)
        } 
        console.log("Cadastrado com sucesso!")
        console.log(this)
    }

    db.run(query, values, afterInsertData)

    // 3 - Consultar os dados da tabela
    db.all(`SELECT * FROM places`, function(err, rows){
        if(err) {
            return console.log(err)
        } 

        console.log("Aqui estão seus registros: ")
        console.log(rows)
    })

   // 4 - Deletar um dado da tabela
     db.run(`DELETE FROM places WHERE id = ?`, [22], function(err){
        if(err) {
            return console.log(err)
        } 
        
        console.log("Registro deletado com sucesso!")
    })

})
