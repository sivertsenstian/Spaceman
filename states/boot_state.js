define(['SS/platformer/state/base_state'], function (SSBaseState) {
  return function () { }
  .inherits(SSBaseState)
  .extend({
    preload: function () {
        this.game.add.text(250, 220, 'loading...', { font: '30px Courier', fill: '#ffffff' });
        //Preload level-metadata
        this.game.load.json('sm_1_1', 'assets/level/sm_1_1.json');
    },

    create: function () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.minWidth = 1280;
      this.scale.minHeight = 720;
      this.scale.maxWidth = 1280;
      this.scale.maxHeight = 720;
      this.scale.forceLandscape = true;
      this.scale.pageAlignHorizontally = true;

      this.game.state.start('menu');
    }
  });

});