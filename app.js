require.config({
  paths: {
    'Phaser': 'node_modules/phaser/build/phaser',
  },
  shim: {
    'Phaser': {
      exports: 'Phaser'
    }
  }
});

require(
    [
      'Phaser',
      'states/boot_state',
      'states/load_state',
      'states/menu_state',
      'states/loss_state',
      'states/win_state'
    ],

    function (Phaser, BootState, LoadState, MenuState, LossState, WinState) {

      var game = new Phaser.Game(1280, 720, Phaser.CANVAS, '');

      //PLUGINS
      if (window.location.hash.toLowerCase().indexOf('#debug') >= 0) {
        require(['node_modules/phaser-debug/dist/phaser-debug'], function (PhaserDebug) {
          game.plugins.add(PhaserDebug);
          game.debugmode = true;
        });
      }

      //STATES
      game.state.add('boot', new BootState());
      game.state.add('menu', new MenuState());
      game.state.add('loss', new LossState());
      game.state.add('win', new WinState());

      //START
      game.state.start('boot');
    }
);