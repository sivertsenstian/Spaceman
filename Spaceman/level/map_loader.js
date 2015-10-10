define(
  [
    'SS/platformer/tiled/map_loader'
  ],

  function (SSMapLoader) {

    return function (game) {
      SSMapLoader.call(this);

      this.game = game;
    }
    .inherits(SSMapLoader)
    .extend({

      loadAssets: function (assets) {
        for (asset_key in assets) { // load assets according to asset key
          if (assets.hasOwnProperty(asset_key)) {
            asset = assets[asset_key];
            switch (asset.type) {
              case "image":
                this.game.load.image(asset_key, asset.source);
                break;
              case "spritesheet":
                this.game.load.spritesheet(asset_key, asset.source, asset.frame_width, asset.frame_height, asset.frames, asset.margin, asset.spacing);
                break;
              case "tilemap":
                this.game.load.tilemap(asset_key, asset.source, null, Phaser.Tilemap.TILED_JSON);
                break;
            }
          }
        }
      },

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
        //Load assets
        this.loadAssets(level.assets);

        //Load map
        var map = this.game.add.tilemap(level.map.key);
        for (var i = 0; i < level.map.tilesets.length; i++) {
          map.addTilesetImage(this.map.tilesets[i].name, level.map.tileset[i]);
        }

        //Add tilesetimage to map


        return map;
      }

    });

  });