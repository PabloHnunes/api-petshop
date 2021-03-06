const express = require('express');
const app = express();
const bodyParcer = require('body-parser');
const config = require('config');
const roteador = require('./rotas/fornecedores');
const NaoEncontrado = require('./erros/NaoEncontrado');
const CampoInvalido = require('./erros/CampoInvalido');
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos');
const ValorNaoSuportado = require('./erros/ValorNaoSuportado');
const formatosAceitos = require('./Serializador').formatosAceitos;
const SerializadorErro = require('./Serializador').SerializadorErro;

const porta = process.env.PORT ? process.env.PORT : config.get('api.porta');

app.use(bodyParcer.json());

app.use((requisicao, resposta, tratamento) => {
    let formatoRequisitado = requisicao.header('Accept');

    if(formatoRequisitado === '*/*'){
        formatoRequisitado = 'application/json';
    }
    
    if(formatosAceitos.indexOf(formatoRequisitado) === -1 ){
        resposta.status(406);
        resposta.end();
        return;
    }

    resposta.setHeader('Content-Type', formatoRequisitado);

    tratamento();
})

app.use('/api/fornecedores', roteador);

app.use((erro, requisicao, resposta, tratamento) => {
    let status = 500;

    if( erro instanceof NaoEncontrado ){
        status = 404;
    }else if( erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos ){
        status = 400;
    }else if( erro instanceof ValorNaoSuportado){
        status = 406;
    }
    
    const serializador = new SerializadorErro(
        resposta.getHeader('Content-Type')
    );
    resposta.status(status);
    resposta.send(
        serializador.serializar({
            mensagem: erro.message,
            id: erro.idErro
        })
    );
})

app.listen(porta, () => {
    console.log('Api rodando');
});