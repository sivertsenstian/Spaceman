define(['SS/platformer/state/base_state'], function (BaseState) {

  return function () { }
  .inherits(BaseState)
  .extend({
    preload: function () {
      //this.game.load.tilemap('test', 'assets/tilemaps/test.json', null, Phaser.Tilemap.TILED_JSON);
      //this.game.load.image('tiles', 'assets/spritesheets/tiles.png');
      //this.game.load.image('items', 'assets/spritesheets/items.png');

      this.game.load.image('mainmenu_background', 'assets/backgrounds/menu.jpg');
        
      this.game.load.image('parallax_background', 'assets/backgrounds/bg.png');
      this.game.load.image('parallax_far', 'assets/backgrounds/far.png');
      this.game.load.image('parallax_middle', 'assets/backgrounds/middle.png');

      this.game.load.json('level1', 'assets/level/level1.json');

      //this.game.load.spritesheet('player', 'assets/spritesheets/player_walk.png', 66, 93, 3);
      //this.game.load.spritesheet('slime', 'assets/spritesheets/enemy_slime.png', 50, 25, 3);
      //this.game.load.spritesheet('snail', 'assets/spritesheets/enemy_snail.png', 60, 32, 2);
      //this.game.load.spritesheet('fly', 'assets/spritesheets/enemy_fly.png', 72, 36, 2);
    },

    create: function () {
      this.game.state.start('menu');
    }
  })

});