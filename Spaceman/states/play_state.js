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
              this.mapLoader = new MapLoader(this);

              //Physics
              this.game.physics.startSystem(Phaser.Physics.ARCADE);
              this.game.physics.arcade.gravity.y = 980;

              this.entities = [];
              this.enemies = [];
          },

          preload: function () {
              //Load map
              this.map = this.mapLoader.init(this.level);

              //Set background
              this.background = new ParallaxBackground(this.game, this.map.widthInPixels, this.map.heightInPixels, this.level.background_layers);
          },

          create: function () {
              //Load layers
              //this.mapLoader.loadLayers();

              this.mapLoader.loadLayersOfType('background');
              this.mapLoader.loadLayersOfType('terrain');

              //Objects
              for (var object_layer in this.map.objects) {
                  if (this.map.objects.hasOwnProperty(object_layer)) {
                      // create layer objects
                      this.map.objects[object_layer].forEach(this.create_object, this);
                  }
              }
              //this.mapLoader.loadObjectsOfType('friendly');

              this.mapLoader.loadLayersOfType('foreground');




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
                  this.player.animations.play("run");
              }
              else if (this.cursors.right.isDown) {
                  this.player.body.velocity.x += 15;
                  this.player.scale.x = 1;
                  this.player.animations.play("run");
              }

              if (this.player.body.velocity.x === 0) {
                  this.player.animations.play("idle");
              }

              this.background.update(this.game.camera);
          },

          render: function () {
              if (this.game.debugmode) {
                  this.game.time.advancedTiming = true;
                  this.game.debug.cameraInfo(this.game.camera, 100, 32);
                  this.game.debug.text(this.game.time.fps || '--', 2, 32, "#00ff00", '30px Arial');
                  for (var i = 0; i < this.entities.length; i++) {
                      this.game.debug.rectangle(this.entities[i].body, 'rgba(0,0,255,0.25)');
                  }
              }
          },

          create_object: function (object) {
              "use strict";
              var position, gameobject;
              // tiled coordinates starts in the bottom left corner
              position = { "x": object.x, "y": object.y };//{"x": object.x + (this.map.tileHeight / 2), "y": object.y - (this.map.tileHeight / 2)};
              // create object according to its type
              switch (object.type) {
                  case "player":
                      this.player = new SSMovableEntity(this, position.x, position.y, 'orc');
                      this.game.physics.arcade.enable(this.player);

                      this.game.add.existing(this.player);
                      this.player.animations.add("run",
                          [
                              'run/1',
                              'run/2',
                              'run/3',
                              'run/4',
                              'run/5',
                              'run/6',
                              'run/7',
                              'run/8'
                          ],
                          10,
                        true);

                      this.player.animations.add("idle",
                          [
                              'idle/1',
                              'idle/2',
                              'idle/3',
                              'idle/4',
                              'idle/3',
                              'idle/2',
                          ],
                          6,
                        true);

                      this.player.animations.play("idle");

                      this.player.anchor.setTo(0.5, 0.5);
                      this.player.body.bounce.y = 0.2;
                      this.player.body.drag.set(250);
                      this.player.body.maxVelocity.x = 300;
                      this.player.body.collideWorldBounds = true;
                      this.player.body.setSize(64, 75, 0, 0);
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