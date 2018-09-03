'use strict'

const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const swig = require('swig');

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({
    extended: false
}))

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/views/'));
app.use('/static', express.static(path.join(__dirname, '../public/')));

router.get('/home', (req, res) => {
    const aluno = {nome : 'nenhum'}
    const curso = {curso: 'nenhum'}
    console.log("acessado")
    res.render(
        'index.html', {
            aluno,
            curso           
        }
    )
}
);

router.post('/home', (req, res) => {
    const aluno = {nome: req.body.nomeAluno}
    const curso = {curso: req.body.curso}
    
    res.render('index.html', 
    {aluno , curso}
)
});

app.use('/', router);
    
app.listen(8080);