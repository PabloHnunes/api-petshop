class CampoInvalido extends Error {
    constructor(campo) {
        const mensagem = `Atenção! O campo ${campo} está inválido.`
        super(mensagem);

        this.name = 'CampoInvalido';
        this.idErro = 1;
    }
}

module.exports = CampoInvalido