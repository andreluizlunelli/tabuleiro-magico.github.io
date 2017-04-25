/// <reference path="typescript/phaser.d.ts" />
var SimpleGame = (function () {
    function SimpleGame(width, height) {
        this.w = width;
        this.h = height;
        //this.game = new Phaser.Game(width, height, Phaser.AUTO, "content", { preload: this.preload, create: this.create, update: this.update, render: this.render });
        this.game = new Phaser.Game(width, height, Phaser.AUTO, "content", this);
    }
    SimpleGame.prototype.preload = function () {
        this.game.load.image("box", "assets/box.png");
    };
    SimpleGame.prototype.create = function () {
        this.game.stage.backgroundColor = "#51E898";
        //  We're going to be using physics, so enable the Arcade Physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        // tamanho box 256x256
        var w = (this.game.world.width / 2) - 128; // 128
        var h = (this.game.world.height / 2) - 128; // 128
        this.box = this.game.add.sprite(w, h, 'box');
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.counter = 0;
        this.step = Math.PI * 2 / 360;
        //this.game.add.tween(this.box).to( { x:this.box.x+20 }, 200, null, true, 0).to( { x:this.box.x }, 200, null, true, 3, 3);      
        //this.shakeBox(this);
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
            this.minhafuncao();
            //  And this tells it to yoyo, i.e. fade back to zero again before repeating.
            //  The 3000 tells it to wait for 3 seconds before starting the fade back.
            //this.tween.yoyo(true, 3000);
        }
    };
    SimpleGame.prototype.render = function () {
        this.game.debug.cameraInfo(this.game.camera, 32, 32);
    };
    SimpleGame.prototype.minhafuncao = function () {
        console.log('entrou minhafuncao');
    };
    SimpleGame.prototype.shakeBox = function (that) {
        var _x = that.box.x;
        that.game.add.tween(that.box).to({ x: that.box.x + 20 }, 200, null, true, 0).to({ x: _x }, 200, null, true, 3, 3);
    };
    return SimpleGame;
}());
window.onload = function () {
    var w = window.innerWidth;
    var h = window.innerHeight;
    var game = new SimpleGame(w, h);
};
function wiggle(aProgress, aPeriod1, aPeriod2) {
    var current1 = aProgress * Math.PI * 2 * aPeriod1;
    var current2 = aProgress * (Math.PI * 2 * aPeriod2 + Math.PI / 2);
    return Math.sin(current1) * Math.cos(current2);
}
