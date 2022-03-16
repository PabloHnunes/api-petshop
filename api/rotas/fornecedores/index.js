const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor');

roteador.get('/', async (requisicao, resposta) => {
    const resultados = await TabelaFornecedor.listar();
    resposta.status(200);
    resposta.send(
        JSON.stringify(resultados)
    );
})

roteador.post('/', async (requisicao, resposta) => {
    try{
        const dadosRecebidos = requisicao.body;
        const fornecedor = new Fornecedor(dadosRecebidos);
        await fornecedor.criar();
        resposta.status(201);
        resposta.send(
            JSON.stringify(fornecedor)
        );
    }
    catch(erro){
        resposta.status(400);
        resposta.send(
            JSON.stringify({
                mensagem: erro.message
            })
        );
    }
})

roteador.get('/:id', async (requisicao, resposta) => {
    try{
        const id = requisicao.params.id;
        const fornecedor = new Fornecedor({id: id});
        await fornecedor.carregar();
        resposta.status(200);
        resposta.send(
            JSON.stringify(fornecedor)
        );
    }
    catch (erro) {
        resposta.status(404);
        resposta.send(
            JSON.stringify({
                mensagem: erro.message
            })
        );
    }
})

roteador.put('/:id', async (requisicao, resposta) => {
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
        resposta.status(400);
        resposta.send(
            JSON.stringify({
                mensagem: erro.message
            })
        );
    }
})

roteador.delete('/:id', async (requisicao, resposta) => {
    try{
        const id = requisicao.params.id;
        const fornecedor = new Fornecedor({ id: id });
        await fornecedor.carregar();
        await fornecedor.remover();

        resposta.status(204);
        resposta.end();
    }
    catch(erro){
        resposta.status(400);
        resposta.send(
            JSON.stringify({
                mensagem: erro.message
            })
        );
    }
})

module.exports = roteador