/// <reference path="typescript/phaser.d.ts" />
var SimpleGame = (function () {
    function SimpleGame(width, height, mirror) {
        this.centena = [];
        this.dezena = [];
        this.unidade = [];
        this.questoes = [];
        this.w = width;
        this.h = height;
        this.game = new Phaser.Game(width, height, Phaser.AUTO, "content", this);
        this.espelhar = mirror;
    }
    SimpleGame.prototype.preload = function () {
        this.game.load.image("back", "assets/back.png");
        this.game.load.image("box", "assets/box.png");
        this.game.load.image("red", "assets/red.png");
        this.game.load.image("yellow", "assets/yellow.png");
        this.game.load.image("blue", "assets/blue.png");
        this.game.load.image("field", "assets/field.png");
        this.game.load.image("bottomButtom", "assets/bottomButtom.png");
        this.game.load.image("upperbutton", "assets/upperbutton.png");
        this.game.load.image("enviar", "assets/field.png");
        this.game.load.image("fim", "assets/fim.jpg");
    };
    SimpleGame.prototype.endTimer = function () {
        console.log('stop timer');
        this.timer.stop();
    };
    SimpleGame.prototype.startTimer = function () {
        console.log('start timer');
        this.timer.start();
        this.enviar.inputEnabled = true;
        this.bottomButtom1.inputEnabled = true;
        this.upperbutton1.inputEnabled = true;
        this.bottomButtom2.inputEnabled = true;
        this.upperbutton3.inputEnabled = true;
        this.bottomButtom3.inputEnabled = true;
        this.upperbutton2.inputEnabled = true;
    };
    SimpleGame.prototype.setTexto1 = function (d) {
        if (d == 0 && +this.text1.text == 9) {
            this.text1.setText("0");
        }
        else if (d == 1 && +this.text1.text == 0) {
            this.text1.setText("9");
        }
        else if (d == 0) {
            this.text1.setText("" + (+this.text1.text + 1));
        }
        else {
            this.text1.setText("" + (+this.text1.text - 1));
        }
    };
    SimpleGame.prototype.setTexto2 = function (d) {
        if (d == 0 && +this.text2.text == 9) {
            this.text2.setText("0");
        }
        else if (d == 1 && +this.text2.text == 0) {
            this.text2.setText("9");
        }
        else if (d == 0) {
            this.text2.setText("" + (+this.text2.text + 1));
        }
        else {
            this.text2.setText("" + (+this.text2.text - 1));
        }
    };
    SimpleGame.prototype.setTexto3 = function (d) {
        if (d == 0 && +this.text3.text == 9) {
            this.text3.setText("0");
        }
        else if (d == 1 && +this.text3.text == 0) {
            this.text3.setText("9");
        }
        else if (d == 0) {
            this.text3.setText("" + (+this.text3.text + 1));
        }
        else {
            this.text3.setText("" + (+this.text3.text - 1));
        }
    };
    SimpleGame.prototype.create = function () {
        this.pontos = 0;
        this.back = this.game.add.sprite(0, 0, 'back');
        this.back.width = 1920;
        this.back.height = 1080;
        this.texto1 = 0;
        this.texto2 = 0;
        this.texto3 = 0;
        this.timer = this.game.time.create();
        this.timerEvent = this.timer.add(Phaser.Timer.MINUTE * 0.5, this.endTimer, this);
        this.game.stage.backgroundColor = "#FFF";
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        // tamanho box 256x256
        var w = (this.game.world.width / 2) - 128; // 128
        var h = (this.game.world.height / 2) - 128; // 128
        var wField = (this.game.world.height / 2) + 100; // 128
        var hField = (this.game.world.height / 2) + 200; // 128
        this.box = this.game.add.sprite(w, h, 'box');
        this.esquerdoField = this.game.add.sprite(wField, hField, 'field');
        this.meioField = this.game.add.sprite(wField + 250, hField, 'field');
        this.direitoField = this.game.add.sprite(wField + 500, hField, 'field');
        this.bottomButtom1 = this.game.add.sprite(wField + 125, hField + 45, 'bottomButtom');
        this.upperbutton1 = this.game.add.sprite(wField + 125, hField + 15, 'upperbutton');
        this.bottomButtom2 = this.game.add.sprite(wField + 375, hField + 45, 'bottomButtom');
        this.upperbutton2 = this.game.add.sprite(wField + 375, hField + 15, 'upperbutton');
        this.bottomButtom3 = this.game.add.sprite(wField + 625, hField + 45, 'bottomButtom');
        this.upperbutton3 = this.game.add.sprite(wField + 625, hField + 15, 'upperbutton');
        this.enviar = this.game.add.sprite(w, 0, 'enviar');
        this.enviar.events.onInputDown.add(function () {
            if (this.questoes[this.atual][0] == +this.text1.text &&
                this.questoes[this.atual][1] == +this.text2.text &&
                this.questoes[this.atual][2] == +this.text3.text) {
                this.pontos = this.pontos + 1;
                this.score.setText("Score: " + this.pontos);
                this.proximaRodada();
            }
        }, this);
        this.bottomButtom1.events.onInputDown.add(function () {
            this.setTexto1(1);
        }, this);
        this.upperbutton1.events.onInputDown.add(function () {
            this.setTexto1(0);
        }, this);
        this.bottomButtom2.events.onInputDown.add(function () {
            this.setTexto2(1);
        }, this);
        this.upperbutton2.events.onInputDown.add(function () {
            this.setTexto2(0);
        }, this);
        this.bottomButtom3.events.onInputDown.add(function () {
            this.setTexto3(1);
        }, this);
        this.upperbutton3.events.onInputDown.add(function () {
            this.setTexto3(0);
        }, this);
        this.text1 = this.game.add.text(wField + 15, hField + 10, "0", { font: "65px Arial", fill: "#ff0044", align: "center" });
        this.text2 = this.game.add.text(wField + 260, hField + 10, "0", { font: "65px Arial", fill: "#ff0044", align: "center" });
        this.text3 = this.game.add.text(wField + 510, hField + 10, "0", { font: "65px Arial", fill: "#ff0044", align: "center" });
        this.score = this.game.add.text(300, 0, "0", { font: "70px Arial", fill: "#ff0044", align: "center" });
        this.score.setText("Score: " + this.pontos);
        this.esquerdoField.inputEnabled = true;
        this.meioField.inputEnabled = true;
        this.direitoField.inputEnabled = true;
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.counter = 0;
        this.step = Math.PI * 2 / 360;
        this.game.input.addPointer();
        this.game.input.addPointer();
        this.game.input.addPointer();
        this.game.input.addPointer();
        this.game.input.addPointer();
        this.questoes = this.getRandomSetParaImprimirNaTela(2);
        this.atual = 0;
        var centena = this.questoes[0][0];
        var dezena = this.questoes[0][1];
        var unidade = this.questoes[0][2];
        this.criarBolinhasNaTela(centena, dezena, unidade);
        if (this.espelhar) {
            // ISSO AQUI FUNCIONA não apagar
            // var g = this.game.add.group();
            // g.x = 500;
            //
            // this.d = g.create(100, 300, 'content');
            // this.d.anchor.setTo(0, 0);
            //
            // this.d.angle = 0;
            // this.game.world.setBounds(100, 100, 2000, 2000);
        }
    };
    SimpleGame.prototype.update = function () {
        var tStep = Math.sin(this.counter);
        this.box.y = ((this.game.world.height / 2) - 128) + tStep * 30;
        this.box.x = ((this.game.world.width / 2) - 128) + tStep * 30;
        this.box.z = this.game.world.width + tStep * 30;
        this.box.rotation += Phaser.Math.degToRad(0.1 * tStep);
        this.counter += this.step;
    };
    SimpleGame.prototype.render = function () {
        // NÃO APAGAR
        // this.game.debug.cameraInfo(this.game.camera, 32, 32);
        // this.game.debug.pointer(this.game.input.mousePointer);
        // this.game.debug.pointer(this.game.input.pointer1);
        // this.game.debug.pointer(this.game.input.pointer2);
        // this.game.debug.pointer(this.game.input.pointer3);
        // this.game.debug.pointer(this.game.input.pointer4);
        // this.game.debug.pointer(this.game.input.pointer5);
        // this.game.debug.pointer(this.game.input.pointer6);
        // this.game.debug.pointer(this.game.input.pointer7);
        // this.game.debug.pointer(this.game.input.pointer8);
        if (this.timer.running) {
            this.game.debug.text(this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000)), 2, 14, "black");
        }
        else {
        }
    };
    SimpleGame.prototype.formatTime = function (s) {
        // Convert seconds (s) to a nicely formatted and padded time string
        var minutes = Math.floor(s / 60);
        var seconds = (s - minutes * 60);
        return minutes + ":" + seconds;
    };
    SimpleGame.prototype.fadeBox = function () {
        console.log('fade');
        this.game.add.tween(this.box).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
    };
    SimpleGame.prototype.shakeBox = function () {
        console.log('shakeBox');
        this.game.add.tween(this.box)
            .to({ x: this.box.x + 10 }, 100, null, true, 0)
            .to({ x: this.box.x - 10 }, 100, null, true, 0)
            .to({ x: this.box.x + 10 }, 100, null, true, 0)
            .to({ x: this.box.x - 10 }, 100, null, true, 0);
    };
    SimpleGame.prototype.getRandomSetParaImprimirNaTela = function (qtdRodadas) {
        var listaRetornaRandomicos = [];
        var inteirosJaEscolhidos = [];
        var a = [
            [9, 9, 9],
            [1, 2, 3],
            [4, 5, 6],
            [6, 2, 0],
            [0, 5, 5],
            [0, 2, 1],
            [0, 1, 8],
            [0, 1, 6],
            [0, 0, 6],
            [0, 3, 1]
        ];
        if (qtdRodadas > a.length) {
            alert("Numero de rodadas maior que o permitido");
        }
        for (var i = 0; i < qtdRodadas; i++) {
            var randomint = this.getRandomInt(0, qtdRodadas);
            // verifico se o numero já existe na lista dos escolhidos
            for (var j = 0; j < inteirosJaEscolhidos.length; j++) {
                if (inteirosJaEscolhidos[j] === randomint) {
                    randomint = this.getRandomInt(0, qtdRodadas);
                }
            }
            inteirosJaEscolhidos.push(randomint);
            var item = a[randomint];
            listaRetornaRandomicos.push(item);
        }
        return listaRetornaRandomicos;
    };
    SimpleGame.prototype.proximaRodada = function () {
        for (var i = 0; i < this.centena.length; i++) {
            this.centena[i].kill();
        }
        this.centena = [];
        this.atual = this.atual + 1;
        if (this.atual > (this.questoes.length - 1)) {
            this.fim = this.game.add.sprite(0, 0, 'fim');
            this.game.world.bringToTop(this.fim);
        }
        else {
            this.text1.setText("0");
            this.text2.setText("0");
            this.text3.setText("0");
            var centena = this.questoes[this.atual][0];
            var dezena = this.questoes[this.atual][1];
            var unidade = this.questoes[this.atual][2];
            this.criarBolinhasNaTela(centena, dezena, unidade);
        }
    };
    SimpleGame.prototype.criarBolinhasNaTela = function (centena, dezena, unidade) {
        var centralizarNoCubo = 90;
        var fixedY = ((this.game.world.height / 2) - centralizarNoCubo) + 10;
        var colunaBolinhasX = (this.game.world.width / 2) - centralizarNoCubo;
        var espacoColunas = 75;
        var w, h, x = 0;
        var y = fixedY;
        var b;
        // centena
        for (var i = 0; i < centena; ++i) {
            x = (i % 2 == 0) ? colunaBolinhasX : colunaBolinhasX + 15;
            y += 15;
            b = this.game.add.sprite(x, y, 'blue');
            b.width = 32;
            b.height = 32;
            this.centena.push(b);
        }
        y = fixedY;
        colunaBolinhasX += espacoColunas;
        // dezena
        for (var i = 0; i < dezena; ++i) {
            x = (i % 2 == 0) ? colunaBolinhasX : colunaBolinhasX + 15;
            y += 15;
            b = this.game.add.sprite(x, y, 'yellow');
            b.width = 32;
            b.height = 32;
            this.centena.push(b);
        }
        y = fixedY;
        colunaBolinhasX += espacoColunas;
        // unidade
        for (var i = 0; i < unidade; ++i) {
            x = (i % 2 == 0) ? colunaBolinhasX : colunaBolinhasX + 15;
            y += 15;
            b = this.game.add.sprite(x, y, 'red');
            b.width = 32;
            b.height = 32;
            this.centena.push(b);
        }
        this.game.world.bringToTop(this.box);
    };
    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    SimpleGame.prototype.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return SimpleGame;
}());
var ManagerGames = (function () {
    function ManagerGames(numInstances, w, h) {
        this.list = [];
        if (numInstances < 1 || numInstances > 4) {
            alert("Numero de instâncias simultâneas é de 1 à 4");
        }
        this.numInstances = numInstances;
        this.w = w;
        this.h = h;
    }
    ManagerGames.prototype.start = function () {
        console.log('start');
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var g = _a[_i];
            g.fadeBox();
            g.startTimer();
        }
    };
    ManagerGames.prototype.addEventPressionarBotaoPlay = function () {
        var _this = this;
        console.log('adicionou evento: addEventPressionarBotaoPlay');
        var btn = document.body.querySelector("#btn-play");
        btn.addEventListener("click", function () {
            _this.start();
        });
    };
    ManagerGames.prototype.load = function () {
        console.log('load');
        switch (this.numInstances) {
            case 1:
                this.list.push(new SimpleGame(this.w, this.h, false));
                break;
            case 2:
                this.list.push(new SimpleGame(this.w / 2, this.h, false));
                this.list.push(new SimpleGame(this.w / 2, this.h, false));
                break;
            case 3:
                this.list.push(new SimpleGame(this.w / 2, this.h / 2, true));
                this.list.push(new SimpleGame(this.w / 2, this.h / 2, true));
                this.list.push(new SimpleGame(this.w / 2, this.h / 2, false));
                break;
            case 4:
                this.list.push(new SimpleGame(this.w / 2, this.h / 2, true));
                this.list.push(new SimpleGame(this.w / 2, this.h / 2, true));
                this.list.push(new SimpleGame(this.w / 2, this.h / 2, false));
                this.list.push(new SimpleGame(this.w / 2, this.h / 2, false));
                break;
            default:
                alert("valor inválido");
                break;
        }
    };
    return ManagerGames;
}());
window.onload = function () {
    var p = getParameterByName('screen');
    var _int = +p;
    if (!_int) {
        _int = 1;
    }
    var w = window.innerWidth;
    var h = window.innerHeight;
    mg = new ManagerGames(_int, w, h);
    mg.load();
    mg.addEventPressionarBotaoPlay();
};
function getParameterByName(name, url) {
    if (url === void 0) { url = ''; }
    if (url.length == 0)
        url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
