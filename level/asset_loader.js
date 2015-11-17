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
          load: function (assets) {
              console.log("==== LOADING ASSETS ====");
              for (asset_key in assets) { // load assets according to asset key
                  if (assets.hasOwnProperty(asset_key)) {
                      asset = assets[asset_key];
                      console.log("[" + asset.type + "] loading '" + asset.source + "' => '" + asset_key + "'");
                      switch (asset.type) {
                          case "image":
                              this.game.load.image(asset_key, asset.source);
                              break;
                          case "spritesheet":
                              this.game.load.spritesheet(asset_key, asset.source, asset.frame_width, asset.frame_height, asset.frames);
                              break;
                          case "tilemap":
                              this.game.load.tilemap(asset_key, asset.source, null, Phaser.Tilemap.TILED_JSON);
                              break;
                          case "atlas":
                              this.game.load.atlas(asset_key, asset.source, asset.json, Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);
                      }
                  }
              }
              console.log("==== ASSETS LOADED ====");
          }
      })
  });



