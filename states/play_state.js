define(
  [
    'SS/platformer/state/base_state',
    'level/map_loader',
    'level/parallax_background',
    'entities/entity_factory'
  ],

  function (SSBaseState, MapLoader, ParallaxBackground, EntityFactory) {
    return function (level) {
      this.level = level;
    }
    .inherits(SSBaseState).extend({
      init: function (params) {
        params = params || {};

        this.coins = 0;
        this.lives = params.lives || 3;

        this.mapLoader = new MapLoader(this);
        this.entityFactory = new EntityFactory(this);

        //Physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 980;
      },

      preload: function () {
        //Load map
        this.map = this.mapLoader.init(this.level);

        //Set background
        this.background = new ParallaxBackground(this.game, this.map.widthInPixels, this.map.heightInPixels, this.level.background_layers);
      },

      create: function () {
        //Load layers
        this.mapLoader.loadLayersOfType('background');
        this.mapLoader.loadLayersOfType('terrain');

        //Set groups
        this.groups = {
          'friendly': this.game.add.group(),
          'hostile': this.game.add.group(),
          'neutral': this.game.add.group()
        };
        
        this.mapLoader.loadObjectsOfType('neutral');
        this.mapLoader.loadObjectsOfType('friendly');
        this.mapLoader.loadObjectsOfType('hostile');

        this.mapLoader.loadLayersOfType('foreground');
      },

      update: function () {
        this.background.update(this.game.camera);

        if (this.coins === 100) {
          this.coins = 0;
          this.lives += 1;
        }
      },

      render: function () {
        //DEBUG
        if (this.game.debugmode) {
          //RENDER RECTANGLE FOR ENTITIES
          for (var i = 0; i < this.groups.friendly.children.length; i++) {
            this.game.debug.rectangle(this.groups.friendly.children[i].body, 'rgba(0,255,0,0.35)');
          }
          for (var i = 0; i < this.groups.hostile.children.length; i++) {
            this.game.debug.rectangle(this.groups.hostile.children[i].body, 'rgba(255,0,0,0.35)');
          }
          for (var i = 0; i < this.groups.neutral.children.length; i++) {
            this.game.debug.rectangle(this.groups.neutral.children[i].body, 'rgba(255, 255,0,0.35)');
          }
          this.game.time.advancedTiming = true;
          this.game.debug.cameraInfo(this.game.camera, 100, 32);
          this.game.debug.text('fps' + this.game.time.fps || '--', 2, 32, "#00ff00", '30px Arial');

          this.game.debug.text('vel x:' + Math.round(this.groups.friendly.getFirstAlive().body.velocity.x) || '--', 2, 64, "#ff0000", '30px Arial');
          this.game.debug.text('vel y:' + Math.round(this.groups.friendly.getFirstAlive().body.velocity.y) || '--', 2, 96, "#0000ff", '30px Arial');

          this.game.debug.text('health:' + Math.round(this.groups.friendly.getFirstAlive().health) || '--', 2, 128, "#0000ff", '30px Arial');
          
          this.game.debug.text('can jump:' + (this.groups.friendly.getFirstAlive().body.blocked.down || this.groups.friendly.getFirstAlive().body.touching.down) || '--', 2, 164, "#0000ff", '30px Arial');
        } else {

          //UI
          this.game.debug.text('coins: ' + this.coins, 2, 32, '#FFFFFF', '30px Arial');
          this.game.debug.text('lives: ' + this.lives, 2, 64, '#FFFFFF', '30px Arial');
        }
      },

      restart: function () {
        this.lives -= 1;
        if (this.lives > 0) {
          this.game.state.restart(true, false, { lives: this.lives });
        } else {
          this.state.start('loss');
        }
      }
    })

  });