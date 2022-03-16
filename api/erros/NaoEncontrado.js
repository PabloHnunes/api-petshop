class NaoEncontrado extends Error {
    constructor(){
        super('Atenção! Fornecedor não encontrado.');
        this.name = 'NaoEncontrado';
        this.idErro = 0;
    }
}

module.exports = NaoEncontrado;