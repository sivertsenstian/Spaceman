//Init namespaces
var Phaser = Phaser || {};
var ss = ss || {};
ss.platformer = ss.platformer || {};
ss.platformer.state = ss.platformer.state || {};

(function () {
  "use strict";
  ss.platformer.state.LoadState = function () { }
  .inherits(ss.platformer.state.BaseState)
  .extend({
    preload: function () {
      this.game.add.text(250, 220, 'loading...', { font: '30px Courier', fill: '#ffffff' });

      this.game.load.tilemap('test', 'assets/tilemaps/test.json', null, Phaser.Tilemap.TILED_JSON);
      this.game.load.image('tiles', 'assets/spritesheets/tiles.png');
      this.game.load.image('items', 'assets/spritesheets/items.png');
      this.game.load.image('parallax_background', 'assets/backgrounds/bg.png');
      this.game.load.image('parallax_far', 'assets/backgrounds/far.png');
      this.game.load.image('parallax_middle', 'assets/backgrounds/middle.png');

      this.game.load.spritesheet('player', 'assets/spritesheets/player_walk.png', 66, 93, 3);
      this.game.load.spritesheet('slime', 'assets/spritesheets/enemy_slime.png', 50, 25, 3);
      this.game.load.spritesheet('snail', 'assets/spritesheets/enemy_snail.png', 60, 32, 2);
      this.game.load.spritesheet('fly', 'assets/spritesheets/enemy_fly.png', 72, 36, 2);
    },

    create: function () {
      this.game.state.start('menu');
    }
  });
}());