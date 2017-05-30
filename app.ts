/// <reference path="typescript/phaser.d.ts" />

class SimpleGame {

    constructor(width: number, height: number, mirror: boolean) {
        this.w = width;
        this.h = height;        
        this.game = new Phaser.Game(width, height, Phaser.AUTO, "content", this);        
        this.mirror = mirror;
    }

    w: number;
    h: number;
    game: Phaser.Game;
    cursors: Phaser.CursorKeys;

    box: Phaser.Sprite;
    tween: Phaser.Tween;
    counter: number;
    step: number;
    mirror: boolean;

    d: Phaser.Sprite;

    centena: Array<Phaser.Sprite> = [];
    dezena: Array<Phaser.Sprite> = [];
    unidade: Array<Phaser.Sprite> = [];

    b1:Phaser.Sprite;

    preload() {
        this.game.load.image("box", "assets/box.png");
        this.game.load.image("circle_red", "assets/circle_red.svg");
        this.game.load.image("circle_yellow", "assets/circle_yellow.svg");
        this.game.load.image("circle_blue", "assets/circle_blue.svg");
    }

    create() {        

        this.game.stage.backgroundColor = "#51E898";        

        //  We're going to be using physics, so enable the Arcade Physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // tamanho box 256x256
        var w = (this.game.world.width / 2) - 128; // 128
        var h = (this.game.world.height / 2) - 128; // 128

        this.box = this.game.add.sprite(w, h, 'box');
        this.box.inputEnabled = true;
        this.box.events.onInputDown.add(function() {            
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

        if (this.mirror) {
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
    }

    update() {        

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
    }  

    render() {        
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
            [0, 1, 5]
            , [0, 2, 2]
            , [0, 2, 3]
            , [0, 3, 3]
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

    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    criarBolinhasNaTela(centena:number, dezena:number, unidade:number) {
        let b1 = this.game.add.sprite(200, 200, 'circle_yellow');
        b1.width = 15;
        b1.height = 15;
        let b2 = this.game.add.sprite(215, 215, 'circle_yellow');
        b2.width = 15;
        b2.height = 15;
        let b3 = this.game.add.sprite(200, 230, 'circle_yellow');
        b3.width = 15;
        b3.height = 15;
        let b4 = this.game.add.sprite(215, 245, 'circle_yellow');
        b4.width = 15;
        b4.height = 15;
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
    //var i = window.prompt("Digite a quantidade de instâncias do jogo(1 à 4)", "");    
    //var _int = +i;
    var _int = 1;
    var w = window.innerWidth;
    var h = window.innerHeight;
    mg = new ManagerGames(_int, w, h);
    mg.start();
};
