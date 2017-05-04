/// <reference path="typescript/phaser.d.ts" />

class SimpleGame {

    constructor(width: number, height: number) {
        this.w = width;
        this.h = height;        
        this.game = new Phaser.Game(width, height, Phaser.AUTO, "content", this);
    }

    w: number;
    h: number;
    game: Phaser.Game;
    cursors: Phaser.CursorKeys;

    box: Phaser.Sprite;
    tween: Phaser.Tween;
    counter: number;
    step: number;

    preload() {
        this.game.load.image("box", "assets/box.png");
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

        //this.game.add.tween(this.box).to( { x:this.box.x+20 }, 200, null, true, 0).to( { x:this.box.x }, 200, null, true, 3, 3);      
        //this.shakeBox(this);
        
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
        this.game.add.tween(this.box)
        .to( { x:this.box.x+10 }, 100, null, true, 0)
        .to( { x:this.box.x-10 }, 100, null, true, 0)       
        .to( { x:this.box.x+10 }, 100, null, true, 0)
        .to( { x:this.box.x-10 }, 100, null, true, 0);      
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
                this.list.push(new SimpleGame(this.w, this.h));
                break;
            
            case 2:
                this.list.push(new SimpleGame(this.w/2, this.h));
                this.list.push(new SimpleGame(this.w/2, this.h));
                break;
            
            case 3:
                this.list.push(new SimpleGame(this.w/2, this.h/2));
                this.list.push(new SimpleGame(this.w/2, this.h/2));
                this.list.push(new SimpleGame(this.w/2, this.h/2));
                break;
            
            case 4:
                this.list.push(new SimpleGame(this.w/2, this.h/2));
                this.list.push(new SimpleGame(this.w/2, this.h/2));
                this.list.push(new SimpleGame(this.w/2, this.h/2));
                this.list.push(new SimpleGame(this.w/2, this.h/2));
                break;
            
            default:
                alert("valor inválido");
                break;
        }
        
    }
}

window.onload = () => {    
    var i = window.prompt("Digite a quantidade de instâncias do jogo(1 à 4)", "");    
    var _int = +i;
    var w = window.innerWidth;
    var h = window.innerHeight;
    var mg= new ManagerGames(_int, w, h);  
        mg.start();
};

function wiggle(aProgress: number, aPeriod1: number, aPeriod2: number): number {
            var current1: number = aProgress * Math.PI * 2 * aPeriod1;
            var current2: number = aProgress * (Math.PI * 2 * aPeriod2 + Math.PI / 2);

            return Math.sin(current1) * Math.cos(current2);
        }