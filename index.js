var Torre = /** @class */ (function () {
    function Torre(nome, ataque, alcance, nivel, valor) {
        this.Nome = nome;
        this.Ataque = ataque;
        this.Alcance = alcance;
        this.Nivel = nivel;
        this.Valor = valor;
    }
    Torre.prototype.Atacar = function () {
        return this.Ataque;
    };
    return Torre;
}());
var Torre1 = new Torre("Cronos", 1, 2, 2, 2500);
var Torre2 = new Torre("Silver", 75, 1, 3, 3300);
var Torre3 = new Torre("Ragnar", 21, 2, 2, 2500);
var Inimigo = /** @class */ (function () {
    function Inimigo(nome, vida) {
        this.Nome = nome;
        this.Vida = vida;
    }
    Inimigo.prototype.ReceberDano = function (valorDoAtaque) {
        this.Vida = this.Vida - valorDoAtaque;
    };
    return Inimigo;
}());
var Inimigo1 = new Inimigo("Gnomo", 1000);
var ArrayTorre = [];
var ArrayTorreSup = [];
ArrayTorreSup.push(Torre1);
ArrayTorreSup.push(Torre2);
ArrayTorreSup.push(Torre3);
var ArrayInimigo = [];
var posicaoInimigo = [];
ArrayTorre.length = 10;
function AdicionarTorre(obejetoTorre, posicaoDoIndex) {
    ArrayTorre[posicaoDoIndex] = obejetoTorre;
    console.log(ArrayTorre);
}
var Inimigos;
var index = 0;
var continuar2 = true;
var continuar3 = true;
var vidaTorre = 10;
var inimigoMorto = [];
var rodadas = 50;
function IniciarPartida(qtdeDeInimigos) {
    Inimigos = qtdeDeInimigos;
    while (continuar2) {
        if (index < Inimigos) {
            ArrayInimigo[index] = Inimigo1;
            posicaoInimigo[index] = 9;
            inimigoMorto.push(true);
        }
        while (continuar3) {
            var parametroNome = prompt("Insira o nome da torre para adiona-la");
            var parametroIndex = parseInt(prompt("Insira a posição que a torre terá"));
            var desejaContinuar = prompt("Deseja adicionar mais torres? s ou n");
            var obejetoTorre = void 0;
            for (var index2 = 0; index2 < 3; index2++) {
                if (parametroNome == ArrayTorreSup[index2].Nome) {
                    obejetoTorre = ArrayTorreSup[index2];
                }
                else if (index2 == 2 && obejetoTorre == undefined) {
                    alert("Nome Incorreto");
                }
            }
            AdicionarTorre(obejetoTorre, parametroIndex);
            if (desejaContinuar != "s") {
                continuar3 = false;
            }
        }
        for (var contador = 0; contador < posicaoInimigo.length; contador++) {
            posicaoInimigo[contador] = posicaoInimigo[contador] - 1;
        }
        for (var index3 = 0; index3 < ArrayTorre.length; index3++) {
            for (var index4 = 0; index4 < posicaoInimigo.length; index4++) {
                if (ArrayInimigo[index4] != undefined) {
                    if (ArrayInimigo[index4].Vida <= 0 && inimigoMorto[index4] == true) {
                        console.log("Inimigo morreu");
                        inimigoMorto[index4] = false;
                        posicaoInimigo[index4] = -1;
                        qtdeDeInimigos--;
                    }
                }
                if (ArrayTorre[index3] != undefined) {
                    if (ArrayTorre[index3].Alcance == 1) {
                        if (posicaoInimigo[index4] == index3) {
                            ArrayInimigo[index4].ReceberDano(ArrayTorre[index3].Atacar());
                            index4 = posicaoInimigo.length;
                        }
                    }
                    else if (ArrayTorre[index3].Alcance == 2) {
                        if (posicaoInimigo[index4] == index3 || posicaoInimigo[index4] == index3 + 1) {
                            ArrayInimigo[index4].ReceberDano(ArrayTorre[index3].Atacar());
                            index4 = posicaoInimigo.length;
                        }
                    }
                }
            }
        }
        rodadas--;
        if (rodadas == 0) {
            continuar2 = false;
        }
        if (qtdeDeInimigos == 0) {
            console.log("Você venceu");
            continuar2 = false;
        }
        for (var i = 0; i < ArrayInimigo.length; i++) {
            if (posicaoInimigo[i] == 0) {
                vidaTorre--;
            }
        }
        if (vidaTorre <= 0) {
            console.log("Você Perdeu");
            continuar2 = false;
        }
        index++;
        console.log(vidaTorre);
    }
}
