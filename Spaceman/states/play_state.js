define(
  [
    'SS/platformer/state/base_state',
    'SS/platformer/gameobject/movable_entity',
    'level/map_loader',
    'level/parallax_background'
  ],

  function (SSBaseState, SSMovableEntity, MapLoader, ParallaxBackground) {
      return function (level) {
          this.level = level;
      }
      .inherits(SSBaseState).extend({
          init: function () {
              this.mapLoader = new MapLoader(this.game);

              //Physics
              this.game.physics.startSystem(Phaser.Physics.ARCADE);
              this.game.physics.arcade.gravity.y = 980;

              this.entities = [];
              this.enemies = [];
          },

          preload: function () {
              //Load map
              this.map = this.mapLoader.load(this.level);

              //Set background
              this.background = new ParallaxBackground(this.game, this.map.widthInPixels, this.map.heightInPixels, this.level.background_layers);
          },

          create: function () {

              //Layers and tiles
              var collision_tiles;
              this.layers = {};
              this.map.layers.forEach(function (layer) {
                  this.layers[layer.name] = this.map.createLayer(layer.name);
                  //this.layers[layer.name].debug = true;
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
              }, this);
              // resize the world to be the size of the current layer
              this.layers[this.map.layer.name].resizeWorld();

              //Objects
              for (var object_layer in this.map.objects) {
                  if (this.map.objects.hasOwnProperty(object_layer)) {
                      // create layer objects
                      this.map.objects[object_layer].forEach(this.create_object, this);
                  }
              }

              //Stuff
              this.cursors = this.game.input.keyboard.createCursorKeys();
              this.jumptimer = 0;
          },

          update: function () {
              this.game.physics.arcade.collide(this.entities, this.layers.terrain);
              this.game.physics.arcade.collide(this.player, this.enemies, this.restart, null, this);

              if (this.player.bottom >= this.game.world.height) {
                  this.restart();
              }

              //player is on the ground, so he is allowed to start a jump
              if (this.cursors.up.isDown && this.player.body.blocked.down) {   //player is on the ground, so he is allowed to start a jump
                  this.jumptimer = this.game.time.elapsed;
                  this.player.body.velocity.y = -400;
              } else if (this.cursors.up.isDown && (this.jumptimer !== 0)) { //player is no longer on the ground, but is still holding the jump key
                  if (this.jumptimer > 300) { // player has been holding jump for over 600 millliseconds, it's time to stop him
                      this.jumptimer = 0;
                  } else { // player is allowed to jump higher, not yet 600 milliseconds of jumping
                      this.jumptimer += this.game.time.elapsed;
                      this.player.body.velocity.y = -400;
                  }
              } else if (this.jumptimer !== 0) { //reset jumptimer since the player is no longer holding the jump key
                  this.jumptimer = 0;
              }

              if (this.cursors.left.isDown) {
                  this.player.body.velocity.x -= 15;
                  this.player.scale.x = -1;
                  this.player.animations.play("walking");
              }
              else if (this.cursors.right.isDown) {
                  this.player.body.velocity.x += 15;
                  this.player.scale.x = 1;
                  this.player.animations.play("walking");
              }

              if (this.player.body.velocity.x === 0) {
                  this.player.animations.stop();
              }

              this.background.update(this.game.camera);
          },

          render: function () {
              //this.game.debug.cameraInfo(this.game.camera, 32, 32);
          },

          create_object: function (object) {
              "use strict";
              var position, gameobject;
              // tiled coordinates starts in the bottom left corner
              position = { "x": object.x, "y": object.y };//{"x": object.x + (this.map.tileHeight / 2), "y": object.y - (this.map.tileHeight / 2)};
              // create object according to its type
              switch (object.type) {
                  case "player":
                      this.player = new SSMovableEntity(this, position.x, position.y, 'player');
                      this.game.physics.arcade.enable(this.player);

                      this.game.add.existing(this.player);
                      this.player.animations.add("walking", [6, 13], 6, true);

                      this.player.anchor.setTo(0.5, 0.5);
                      this.player.body.bounce.y = 0.2;
                      this.player.body.drag.set(250);
                      this.player.body.maxVelocity.x = 300;
                      this.player.body.collideWorldBounds = true;

                      this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);

                      this.entities.push(this.player);

                      //prefab = new Platformer.Player(this, position, object.properties);
                      break;

                  case "slime":
                      var slime = new SSMovableEntity(this, position.x, position.y, 'slime');
                      this.game.physics.arcade.enable(slime);

                      this.game.add.existing(slime);
                      slime.animations.add("walking", [0, 1, 0], 6, true);

                      slime.animations.play("walking", true);

                      slime.anchor.setTo(0.5, 0.5);
                      slime.body.velocity.x = -25;
                      slime.body.collideWorldBounds = true;

                      this.entities.push(slime);
                      this.enemies.push(slime);
                      break;

                  case "snail":
                      var snail = new SSMovableEntity(this, position.x, position.y, 'snail');
                      this.game.physics.arcade.enable(snail);

                      this.game.add.existing(snail);
                      snail.animations.add("walking", [0, 1, 0], 6, true);

                      snail.animations.play("walking", true);

                      snail.anchor.setTo(0.5, 0.5);
                      snail.body.velocity.x = -60;
                      snail.body.collideWorldBounds = true;

                      this.entities.push(snail);
                      this.enemies.push(snail);
                      break;

                  case "fly":
                      var fly = new SSMovableEntity(this, position.x, position.y, 'fly');
                      this.game.physics.arcade.enable(fly);

                      this.game.add.existing(fly);
                      fly.animations.add("walking", [0, 1, 0], 6, true);

                      fly.animations.play("walking", true);

                      fly.anchor.setTo(0.5, 0.5);
                      fly.body.velocity.x = -60;
                      fly.body.collideWorldBounds = true;
                      fly.body.allowGravity = false;

                      this.entities.push(fly);
                      this.enemies.push(fly);
                      break;
              }
              //this.prefabs[object.name] = prefab;
          },

          restart: function () {
              this.game.state.restart(true, false);
          }
      })

  });