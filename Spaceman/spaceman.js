window.onload = function () {

    var game = new Phaser.Game(1280, 720, Phaser.CANVAS, '');

    //STATES
    game.state.add('boot', new ss.platformer.state.BootState());
    game.state.add('load', new ss.platformer.state.LoadState());
    game.state.add('menu', new ss.platformer.state.MenuState());
    game.state.add('play', new ss.platformer.state.PlayState());
    game.state.add('loss', new ss.platformer.state.LossState());

    //START
    game.state.start('boot');
};