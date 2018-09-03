const mysql = require('mysql');
const promise = require('promise')

const config = {
    host : 'db',
    user : 'root',
    database : 'cadastro',
    password : 'pass'
};

const connection = connect(config);

function connect(config) {
    const connection = mysql.createConnection(config);
    connection.connect(function(err){
        if(err){
            console.info('Error connecting' +err)
            errorHandler(err)
        }else{
            console.info('Mysql connected to ' + connection.config.host + ':' + connection.config.port);
        }
    });
    connection.on('error', errorHandler);
    return connection;
}

function errorHandler(err) {
    console.info('MySQL error ' + err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.info('MySQL connection lost. Reconnecting.');
        connection = connect();
    } else if (err.code === 'ECONNREFUSED') {
        console.info('MySQL connection refused. Trying again in 3 seconds.');
        setTimeout(function() {
            connection = connect();
        }, 3000);
    }
}

function query() {
    const start = Date.now()
    return connection.query.apply(connection, arguments)
}

function close() {
    connection.end();
}

function insertAluno(aluno) {
    return new Promise(function(fulfill, reject){
        console.log(aluno)
        connection.query(
            `INSERT INTO aluno 
            (curso, nome) 
            VALUES ('${aluno.curso}', '${aluno.nome}');`
        ),
        function (err, fields) {
            if (err) reject(err);
            else fulfill(res)
        }
    })
}

function selectAluno(callback) {
    return new Promise(function(fulfill, reject){
        connection.query(
            `SELECT * FROM aluno`
        ),
        function (err, rows) {
            if (err) reject(err)
            else fulfill(res)
        
        callback(null, rows);
        }
    })
}


module.exports.insertAluno = insertAluno;
module.exports.selectAluno = selectAluno;