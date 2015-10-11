define(
  [
    'Phaser',
    'SS/utils/extend'
  ],

  function (Phaser, extend) {

      return function (game_state) {
          this.game_state = game_state;
          this.game_state.layers = {};
      }
      .extend({
          loadLayersOfType: function (type) {
              console.log("=== LOADING LAYERS: [" + type + "] ===");
              //Layers and tiles
              var collision_tiles, layers;
              layers = {};
              this.map.layers.forEach(function (layer) {
                  if(layer.name.toLowerCase().startsWith(type.toLowerCase())) {
                      layers[layer.name] = this.map.createLayer(layer.name);
                      layers[layer.name].debug = this.game_state.game.debugmode;
                      if (layer.properties.collision) { // collision layer
                          collision_tiles = [];
                          layer.data.forEach(function (data_row) { // find tiles used in the layer
                              data_row.forEach(function (tile) {
                                  // check if it's a valid tile index and isn't already in the list
                                  if (tile.index > 0 && collision_tiles.indexOf(tile.index) === -1) {
                                      collision_tiles.push(tile.index);
                                  }
                              }, this);
                          }, this);
                          this.map.setCollision(collision_tiles, true, layer.name);
                      }
                      this.game_state.layers[layer.name] = layers[layer.name];
                      layers[layer.name].resizeWorld();
                      console.log(layer.name + " loaded");
                  }
              }, this);

              // resize the world to be the size of the current layer
              //layers[this.map.layer.name].resizeWorld();
              console.log("=== [" + type + "] LAYERS LOADED ===");
          },

          loadObjectsOfType: function (type) {
              for (var object_layer in this.map.objects) {
                  if (this.map.objects.hasOwnProperty(object_layer)) {
                      // create layer objects
                      this.map.objects[object_layer].forEach(function (object) {
                          if (object_layer.toLowerCase() === type.toLowerCase()) {
                              this.entityFactory(object)
                          }
                      }, this);
                  }
              }
          },

          loadGroups: function (groups) {
              var result = {};

              groups.forEach(function (group_name) {
                  result[group_name] = this.game_state.game.add.group();
              }, this);

              return result;
          },

          init: function (level) {
              //Load map
              this.map = this.game_state.game.add.tilemap(level.map.key);

              //Add tilesetimages to map, assets-key and name in map expected to match
              for (var i = 0; i < level.map.tilesets.length; i++) {
                  this.map.addTilesetImage(level.map.tilesets[i]);
              }

              return this.map;
          },

          load: function () {

          }

      })

  });