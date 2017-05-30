/// <reference path="typescript/phaser.d.ts" />
var SimpleGame = (function () {
    function SimpleGame(width, height, mirror) {
        this.centena = [];
        this.dezena = [];
        this.unidade = [];
        this.w = width;
        this.h = height;
        this.game = new Phaser.Game(width, height, Phaser.AUTO, "content", this);
        this.espelhar = mirror;
    }
    SimpleGame.prototype.preload = function () {
        this.game.load.image("box", "assets/box.png");
        this.game.load.image("circle_red", "assets/circle_red.svg");
        this.game.load.image("circle_yellow", "assets/circle_yellow.svg");
        this.game.load.image("circle_blue", "assets/circle_blue.svg");
    };
    SimpleGame.prototype.create = function () {
        this.game.stage.backgroundColor = "#51E898";
        //  We're going to be using physics, so enable the Arcade Physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        // tamanho box 256x256
        var w = (this.game.world.width / 2) - 128; // 128
        var h = (this.game.world.height / 2) - 128; // 128
        this.box = this.game.add.sprite(w, h, 'box');
        this.box.inputEnabled = true;
        this.box.events.onInputDown.add(function () {
            this.shakeBox();
        }, this);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.counter = 0;
        this.step = Math.PI * 2 / 360;
        this.game.input.addPointer();
        this.game.input.addPointer();
        this.game.input.addPointer();
        this.game.input.addPointer();
        this.game.input.addPointer();
        var a = this.getRandomSetParaImprimirNaTela(2);
        var centena = a[0][0];
        var dezena = a[0][1];
        var unidade = a[0][2];
        this.criarBolinhasNaTela(centena, dezena, unidade);
        if (this.espelhar) {
            // ISSO AQUI FUNCIONA
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
        /*
        var tStep = Math.sin( this.counter ) ;
        this.box.y = ((this.game.world.height / 2) - 128) + tStep * 30 ;
        this.box.x = ((this.game.world.width / 2) - 128) + tStep * 30 ;
        this.box.z = this.game.world.width + tStep * 30 ;
        this.box.rotation += Phaser.Math.degToRad( 0.1 * tStep ) ;
        this.counter += this.step ;
        */
        if (this.cursors.down.isDown) {
            //this.game.stage.backgroundColor = "#000000";
            this.shakeBox();
            //  And this tells it to yoyo, i.e. fade back to zero again before repeating.
            //  The 3000 tells it to wait for 3 seconds before starting the fade back.
            //this.tween.yoyo(true, 3000);
        }
    };
    SimpleGame.prototype.render = function () {
        this.game.debug.cameraInfo(this.game.camera, 32, 32);
        this.game.debug.pointer(this.game.input.mousePointer);
        this.game.debug.pointer(this.game.input.pointer1);
        this.game.debug.pointer(this.game.input.pointer2);
        this.game.debug.pointer(this.game.input.pointer3);
        this.game.debug.pointer(this.game.input.pointer4);
        this.game.debug.pointer(this.game.input.pointer5);
        this.game.debug.pointer(this.game.input.pointer6);
        this.game.debug.pointer(this.game.input.pointer7);
        this.game.debug.pointer(this.game.input.pointer8);
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
            [0, 1, 8]
        ];
        if (qtdRodadas > a.length) {
            alert("Numero de rodadas maior que o permitido");
        }
        for (var i = 0; i < qtdRodadas; i++) {
            var randomint = this.getRandomInt(0, qtdRodadas);
            // verifico se o numero já existe na lista dos escolhidos
            for (var j = 0; j < inteirosJaEscolhidos.length; j++) {
                if (inteirosJaEscolhidos[j] === randomint) {
                    randomint = this.getRandomInt(0, qtdRodadas + 1);
                }
            }
            inteirosJaEscolhidos.push(randomint);
            var item = a[randomint];
            listaRetornaRandomicos.push(item);
        }
        return listaRetornaRandomicos;
    };
    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    SimpleGame.prototype.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    SimpleGame.prototype.criarBolinhasNaTela = function (centena, dezena, unidade) {
        var w, h, x = 0;
        var y = 200;
        var b;
        // centena
        for (var i = 0; i < centena; ++i) {
            x = (i % 2 == 0) ? 200 : 215;
            y += 15;
            b = this.game.add.sprite(x, y, 'circle_blue');
            b.width = 15;
            b.height = 15;
            this.centena.push(b);
        }
        y = 200;
        // dezena
        for (var i = 0; i < dezena; ++i) {
            x = (i % 2 == 0) ? 230 : 245;
            y += 15;
            b = this.game.add.sprite(x, y, 'circle_yellow');
            b.width = 15;
            b.height = 15;
            this.centena.push(b);
        }
        y = 200;
        // unidade
        for (var i = 0; i < unidade; ++i) {
            x = (i % 2 == 0) ? 260 : 275;
            y += 15;
            b = this.game.add.sprite(x, y, 'circle_red');
            b.width = 15;
            b.height = 15;
            this.centena.push(b);
        }
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
        switch (this.numInstances) {
            case 1:
                this.list.push(new SimpleGame(this.w, this.h, true));
                break;
            case 2:
                //this.list.push(new SimpleGame(this.w/2, this.h));
                //this.list.push(new SimpleGame(this.w/2, this.h));
                break;
            case 3:
                //this.list.push(new SimpleGame(this.w/2, this.h/2));
                //this.list.push(new SimpleGame(this.w/2, this.h/2));
                //this.list.push(new SimpleGame(this.w/2, this.h/2));
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
    //var i = window.prompt("Digite a quantidade de instâncias do jogo(1 à 4)", "");    
    //var _int = +i;
    var _int = 1;
    var w = window.innerWidth;
    var h = window.innerHeight;
    mg = new ManagerGames(_int, w, h);
    mg.start();
};
