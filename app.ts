/// <reference path="typescript/phaser.d.ts" />

class SimpleGame {

    constructor(width: number, height: number, mirror: boolean) {
        this.w = width;
        this.h = height;        
        this.game = new Phaser.Game(width, height, Phaser.AUTO, "content", this);        
        this.espelhar = mirror;
    }

    w: number; // total tela
    h: number; // total tela
    game: Phaser.Game;
    cursors: Phaser.CursorKeys;

    box: Phaser.Sprite;
    tween: Phaser.Tween;
    counter: number;
    step: number;
    espelhar: boolean;

    d: Phaser.Sprite;

    centena: Array<Phaser.Sprite> = [];
    dezena: Array<Phaser.Sprite> = [];
    unidade: Array<Phaser.Sprite> = [];

    timer: Phaser.Timer;
    timerEvent: Phaser.TimerEvent;

    preload() {
        this.game.load.image("box", "assets/box.png");
        this.game.load.image("circle_red", "assets/circle_red.svg");
        this.game.load.image("circle_yellow", "assets/circle_yellow.svg");
        this.game.load.image("circle_blue", "assets/circle_blue.svg");
    }

    endTimer() {
        console.log('stop timer');
        this.timer.stop();
    }

    startTimer() {
        console.log('start timer');
        this.timer.start();
    }

    create() {

        this.timer = this.game.time.create();
        this.timerEvent = this.timer.add(Phaser.Timer.MINUTE * 0.5, this.endTimer, this);

        this.game.stage.backgroundColor = "#51E898";
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        // tamanho box 256x256
        var w = (this.game.world.width / 2) - 128; // 128
        var h = (this.game.world.height / 2) - 128; // 128

        this.box = this.game.add.sprite(w, h, 'box');
        this.box.inputEnabled = true;

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

        if (this.espelhar) { // espelhar
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
    }

    update() {

        /* NÃO APAGAR
        var tStep = Math.sin( this.counter ) ;
        this.box.y = ((this.game.world.height / 2) - 128) + tStep * 30 ;
        this.box.x = ((this.game.world.width / 2) - 128) + tStep * 30 ;
        this.box.z = this.game.world.width + tStep * 30 ;
        this.box.rotation += Phaser.Math.degToRad( 0.1 * tStep ) ;
        this.counter += this.step ;
        */
    }

    render() {
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
    }

    formatTime(s:number) {
        // Convert seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);
    }

    fadeBox() {
        console.log('fade');
        this.game.add.tween(this.box).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
    }

    shakeBox() {
        console.log('shakeBox');
        this.game.add.tween(this.box)
        .to( { x:this.box.x+10 }, 100, null, true, 0)
        .to( { x:this.box.x-10 }, 100, null, true, 0)
        .to( { x:this.box.x+10 }, 100, null, true, 0)
        .to( { x:this.box.x-10 }, 100, null, true, 0);
    }

    getRandomSetParaImprimirNaTela(qtdRodadas: number) {
        var listaRetornaRandomicos = [];
        var inteirosJaEscolhidos = [];
        var a = [
            [9, 9, 9]
            , [1, 2, 3]
            , [4, 5, 6]
            , [6, 2, 0]
            , [0, 5, 5]
            , [0, 2, 1]            
            , [0, 1, 8]            
            , [0, 1, 6]            
            , [0, 0, 6]            
            , [0, 3, 1]            
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
    }

    criarBolinhasNaTela(centena:number, dezena:number, unidade:number) {

        var centralizarNoCubo = 90;
        var fixedY = ((this.game.world.height / 2) - centralizarNoCubo) + 10;
        var colunaBolinhasX = (this.game.world.width / 2) - centralizarNoCubo;

        var espacoColunas = 75;

        var w, h, x = 0;
        var y = fixedY;
        let b;

        // centena
        for (var i = 0; i < centena; ++i) {
            x = (i % 2 == 0) ? colunaBolinhasX : colunaBolinhasX+15;
            y += 15;

            b = this.game.add.sprite(x, y, 'circle_blue');
            b.width = 15;
            b.height = 15;
            this.centena.push( b );
        }

        y = fixedY;
        colunaBolinhasX += espacoColunas;
        // dezena
        for (var i = 0; i < dezena; ++i) {
            x = (i % 2 == 0) ? colunaBolinhasX : colunaBolinhasX+15;
            y += 15;

            b = this.game.add.sprite(x, y, 'circle_yellow');
            b.width = 15;
            b.height = 15;
            this.centena.push( b );
        }

        y = fixedY;
        colunaBolinhasX += espacoColunas;
        // unidade
        for (var i = 0; i < unidade; ++i) {
            x = (i % 2 == 0) ? colunaBolinhasX : colunaBolinhasX+15;
            y += 15;

            b = this.game.add.sprite(x, y, 'circle_red');
            b.width = 15;
            b.height = 15;
            this.centena.push( b );
        }

        this.game.world.bringToTop(this.box);
    }

    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}

class ManagerGames {
    
    constructor(numInstances: number, w: number, h: number) {
        if (numInstances < 1 || numInstances > 4) {
            alert("Numero de instâncias simultâneas é de 1 à 4");
        }
        this.numInstances = numInstances;
        this.w = w;
        this.h = h;        
    }

    numInstances: number;
    w: number;
    h: number;
    list:Array<SimpleGame> = [];

    start() {
        console.log('start');
        for (let g of this.list) {
            g.fadeBox();
            g.startTimer();
        }
    }

    addEventPressionarBotaoPlay() {
        console.log('adicionou evento: addEventPressionarBotaoPlay');
        let btn = <HTMLElement>document.body.querySelector("#btn-play");
        btn.addEventListener("click", () => {
            this.start();
        });
    }

    load() {
        console.log('load');
        switch (this.numInstances) {
            case 1:
                this.list.push(new SimpleGame(this.w, this.h, false));
                break;

            case 2:
                this.list.push(new SimpleGame(this.w/2, this.h, false));
                this.list.push(new SimpleGame(this.w/2, this.h, false));
                break;

            case 3:
                this.list.push(new SimpleGame(this.w/2, this.h/2, true));
                this.list.push(new SimpleGame(this.w/2, this.h/2, true));
                this.list.push(new SimpleGame(this.w/2, this.h/2, false));
                break;

            case 4:
                this.list.push(new SimpleGame(this.w/2, this.h/2, true));
                this.list.push(new SimpleGame(this.w/2, this.h/2, true));
                this.list.push(new SimpleGame(this.w/2, this.h/2, false));
                this.list.push(new SimpleGame(this.w/2, this.h/2, false));
                break;

            default:
                alert("valor inválido");
                break;
        }
    }
}

declare var mg: ManagerGames;
window.onload = () => {

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

function getParameterByName(name, url='') {
    if (url.length == 0) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

