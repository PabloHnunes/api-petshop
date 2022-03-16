const Modelo = require('./ModeloTabelaFornecedor');    


module.exports = {
    listar() {
        return Modelo.findAll();
    },
    inserir( fornecedor ) {
        return Modelo.create(fornecedor);
    },
    async pegarPorId( id ) {
        const encontrado = await Modelo.findOne({ 
            where: {
                id: id
        } });
        
        if (!encontrado){
            throw new Error('ATENÇÃO! Fornecedor Não encontrado.');
        }

        return encontrado;
    },
    async atualizar(id , dadosParaAtualizar){
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: { id: id }
            }
        )
    },
    async remover(id){
        await Modelo.destroy({
            where: { id: id }
        })
    }
}