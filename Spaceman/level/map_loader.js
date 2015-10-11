define(
  [
    'Phaser',
    'SS/utils/extend'
  ],

  function (Phaser, extend) {

      return function (game) {
          this.game = game;
      }
      .extend({
          loadLayers: function (map) {
              this.game.add.tilemap(map);

          },

          loadGroups: function (groups) {
              var result = {};

              groups.forEach(function (group_name) {
                  result[group_name] = this.game.add.group();
              }, this);

              return result;
          },

          loadParrallax: function () {

          },

          load: function (level) {
              //Load map
              var map = this.game.add.tilemap(level.map.key);
              //Add tilesetimages to map, assets-key and name in map expected to match
              for (var i = 0; i < level.map.tilesets.length; i++) {
                  map.addTilesetImage(level.map.tilesets[i]);
              }
              return map;
          }

      })

  });