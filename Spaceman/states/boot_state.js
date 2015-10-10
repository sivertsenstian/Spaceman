define(['SS/platformer/state/base_state'], function (BaseState) {
  return function () { }
  .inherits(BaseState)
  .extend({
    preload: function () {
      this.game.add.text(250, 220, 'loading...', { font: '30px Courier', fill: '#ffffff' });
    },

    create: function () {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.minWidth = 1280;
      this.scale.minHeight = 720;
      this.scale.maxWidth = 1280;
      this.scale.maxHeight = 720;
      this.scale.forceLandscape = true;
      this.scale.pageAlignHorizontally = true;

      this.game.state.start('load');
    }
  });

});