const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor');
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor;

roteador.get('/', async (requisicao, resposta) => {
    const resultados = await TabelaFornecedor.listar();
    resposta.status(200);
    const serializador = new SerializadorFornecedor(
        resposta.getHeader('Content-Type')
    );
    resposta.send(
        serializador.serializar(resultados)
    );
});

roteador.post('/', async (requisicao, resposta, tratamento) => {
    try{
        const dadosRecebidos = requisicao.body;
        const fornecedor = new Fornecedor(dadosRecebidos);
        await fornecedor.criar();
        resposta.status(201);
        const serializador = new SerializadorFornecedor(
            resposta.getHeader('Content-Type')
        );
        resposta.send(
            serializador.serializar(fornecedor)
        );
    }
    catch(erro){
        tratamento(erro);
    }
});

roteador.get('/:id', async (requisicao, resposta, tratamento) => {
    try{
        const id = requisicao.params.id;
        const fornecedor = new Fornecedor({id: id});
        await fornecedor.carregar();
        resposta.status(200);
        const serializador = new SerializadorFornecedor(
            resposta.getHeader('Content-Type'),
            ['email', 'dataCriacao', 'dataAtualizacao', 'versao']
        );
        resposta.send(
            serializador.serializar(fornecedor)
        );
    }
    catch (erro) {
        tratamento(erro);
    }
});

roteador.put('/:id', async (requisicao, resposta, tratamento) => {
    try{
        const id = requisicao.params.id;
        const dadosRecebidos = requisicao.body;
        const dados = Object.assign({}, dadosRecebidos, { id: id });
        const fornecedor = new Fornecedor(dados);
        await fornecedor.atualizar();

        resposta.status(204);
        resposta.end();
    }
    catch(erro){
        tratamento(erro);
    }
});

roteador.delete('/:id', async (requisicao, resposta, tratamento) => {
    try{
        const id = requisicao.params.id;
        const fornecedor = new Fornecedor({ id: id });
        await fornecedor.carregar();
        await fornecedor.remover();

        resposta.status(204);
        resposta.end();
    }
    catch(erro){
        tratamento(erro);
    }
});

module.exports = roteador;