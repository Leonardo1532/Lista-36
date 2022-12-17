class Torre {
    Nome: string
    Ataque: number
    Alcance: Number
    Nivel: Number
    Valor: Number
    constructor(nome: string, ataque: number, alcance: number, nivel: number, valor: number) {
        this.Nome = nome
        this.Ataque = ataque
        this.Alcance = alcance
        this.Nivel = nivel
        this.Valor = valor
    }
    Atacar() {
        return this.Ataque
    }
}

let Torre1 = new Torre("Cronos", 1, 2, 2, 2500)
let Torre2 = new Torre("Silver", 75, 1, 3, 3300)
let Torre3 = new Torre("Ragnar", 21, 2, 2, 2500)

class Inimigo {
    Nome: string
    Vida: number
    constructor(nome: string, vida: number) {
        this.Nome = nome
        this.Vida = vida
    }
    ReceberDano(valorDoAtaque: number) {
        this.Vida = this.Vida - valorDoAtaque
    }
}

let Inimigo1 = new Inimigo("Gnomo", 1000)

let ArrayTorre: Torre[] = []
let ArrayTorreSup: Torre[] = []

ArrayTorreSup.push(Torre1)
ArrayTorreSup.push(Torre2)
ArrayTorreSup.push(Torre3)

let ArrayInimigo: Inimigo[] = []
let posicaoInimigo: number[] = []
ArrayTorre.length = 10

function AdicionarTorre(obejetoTorre: Torre, posicaoDoIndex: number) {
    ArrayTorre[posicaoDoIndex] = obejetoTorre
    console.log(ArrayTorre)
}

let Inimigos: number
let index = 0
let continuar2 = true
let continuar3 = true
let vidaTorre = 10
let inimigoMorto: boolean[] = []

let rodadas = 50
function IniciarPartida(qtdeDeInimigos: number) {
    Inimigos = qtdeDeInimigos
    while (continuar2) {
        if (index < Inimigos) {
            ArrayInimigo[index] = Inimigo1
            posicaoInimigo[index] = 9
            inimigoMorto.push(true)
        }
        while (continuar3) {

            let parametroNome = prompt("Insira o nome da torre para adiona-la")
            let parametroIndex = parseInt(prompt("Insira a posição que a torre terá"))
            let desejaContinuar = prompt("Deseja adicionar mais torres? s ou n")
            let obejetoTorre: Torre

            for (let index2 = 0; index2 < 3; index2++) {
                if (parametroNome == ArrayTorreSup[index2].Nome) {
                    obejetoTorre = ArrayTorreSup[index2]
                } else if (index2 == 2 && obejetoTorre == undefined) {
                    alert("Nome Incorreto")
                }
            }
            AdicionarTorre(obejetoTorre, parametroIndex)
            if (desejaContinuar != "s") {
                continuar3 = false
            }
        }
        for (let contador = 0; contador < posicaoInimigo.length; contador++) {
            posicaoInimigo[contador] = posicaoInimigo[contador] - 1
        }

        for (let index3 = 0; index3 < ArrayTorre.length; index3++) {
            for (let index4 = 0; index4 < posicaoInimigo.length; index4++) {
                if (ArrayInimigo[index4] != undefined) {
                    if (ArrayInimigo[index4].Vida <= 0 && inimigoMorto[index4] == true) {
                        console.log("Inimigo morreu")
                        inimigoMorto[index4] = false
                        posicaoInimigo[index4] = -1
                        qtdeDeInimigos--
                    }
                }
                if (ArrayTorre[index3] != undefined) {
                    if (ArrayTorre[index3].Alcance == 1) {
                        if (posicaoInimigo[index4] == index3) {
                            ArrayInimigo[index4].ReceberDano(ArrayTorre[index3].Atacar())
                            index4 = posicaoInimigo.length
                        }
                    } else if (ArrayTorre[index3].Alcance == 2) {
                        if (posicaoInimigo[index4] == index3 || posicaoInimigo[index4] == index3 + 1) {
                            ArrayInimigo[index4].ReceberDano(ArrayTorre[index3].Atacar())
                            index4 = posicaoInimigo.length
                        }
                    }
                }
            }
        }
        rodadas--
        if (rodadas == 0) {
            continuar2 = false
        }

        if (qtdeDeInimigos == 0) {
            console.log("Você venceu")
            continuar2 = false
        }

        for (let i = 0; i < ArrayInimigo.length; i++) {
            if (posicaoInimigo[i] == 0) {
                vidaTorre--
            }
        }
        if (vidaTorre <= 0) {
            console.log("Você Perdeu")
            continuar2 = false
        }
        index++
        console.log(vidaTorre)
    }
}