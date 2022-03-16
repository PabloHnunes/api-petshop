const express = require('express');
const app = express();
const bodyParcer = require('body-parser');
const config = require('config');
const roteador = require('./rotas/fornecedores');


app.use(bodyParcer.json())

app.use('/api/fornecedores', roteador)

app.listen(config.get('api.porta'), () => {
    console.log('Api rodando')
})