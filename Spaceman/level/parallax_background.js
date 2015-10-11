define(
  [
    'Phaser',
    'SS/utils/extend'
  ],

  function (Phaser, extend) {
      return function (game, map_width, map_height, layers) {
          //Init
          this.speed = 0.1;
          this.previous_X = null;
          this.layers = [];

          //Define layers
          for (var i = 0; i < layers.length; i++) {
              this.layers.push(new Phaser.TileSprite(game, 0, 0, map_width, map_height, layers[i]));
              game.add.existing(this.layers[i]);
          }
      }
    .extend({
        update: function (camera) {
            if (camera.x !== this.previous_X) {
                for (var i = 0; i < this.layers.length; i++) {
                    this.layers[i].x = camera.x * ((i * this.speed) + this.speed);
                }
            }
        }
    });
  });