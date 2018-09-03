'use strict'

const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const swig = require('swig');
const promise = require('promise')
const app = express();
const router = express.Router();

app.use(express.static('public'));
app.use(bodyParser.json());

const {insertAluno, selectAluno} = require('./models/model')

app.use(bodyParser.urlencoded({
    extended: false
}))

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/views/'));
app.use('/static', express.static(path.join(__dirname, '../public/')));


router.use(function (req,res,next) {
    console.log("/" + req.method);
    next();
  });


router.get('/home', (req, res) => {
    const aluno = {nome : 'nenhum', curso: 'nenhum'}
    res.render('index.html', {
        aluno
    })
})

router.post('/home', (req, res) => {
    console.log('Post a Customer: ' + JSON.stringify(req.body));
    let aluno = {nome: req.body.nome, curso: req.body.curso};
    insertAluno(aluno).then(console.log(selectAluno()))
    res.send(aluno);
})
app.use('/', router);

app.listen(8080);